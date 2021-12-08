import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { LineChartLoader } from '../ChartLoaders'
import { formatAmount } from '../../utils/formatInfoNumbers'
import dayjs from 'dayjs'
import styled from 'styled-components'

const TooltipBox = styled.div`
  color:${({ theme }) => theme.colors.white_black};
  background-color:rgba(81, 125, 255, 0.5);
  border-radius: 5px;
  padding: 10px;
`
const Dot = styled.div`
width: 17px;
height: 17px;
background: #FFFFFF;
border: 4px solid #2BEC93;
border-radius: 50%;
`

export type LineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
} & React.HTMLAttributes<HTMLDivElement>

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ locale, payload, setHoverValue, setHoverDate }) => {

  useEffect(() => {
    setHoverValue(payload.value)
    setHoverDate(payload.time)
  }, [locale, payload.value, payload.time, setHoverValue, setHoverDate])
  return null
}

const CustomTooltip = ({ locale, payload, setHoverValue, setHoverDate }) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (payload && payload.length) {
      setHoverValue(payload[0].payload.value)
      setHoverDate(payload[0].payload.time)
    }
  }, [locale, payload[0], payload[0], setHoverValue, setHoverDate])
  if (payload && payload.length) {
    return (
      <TooltipBox>
        <div>{t('AccountTime')}:{dayjs(payload[0].payload.time * 1000).format('MM-DD HH:mm')}</div>
        <div>{t('Rewards')}:{payload[0].payload.value}</div>
      </TooltipBox>
    );
  }
  return null;
};
const CustomizedActiveDot: React.FC = () => {
  return (
    <Dot></Dot>
  )
}
/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data, setHoverValue, setHoverDate }: LineChartProps) => {
  const {
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()
  if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        width={300}
        height={308}
        margin={{
          top: 10,
          right: 5,
          left: -30,
          bottom: 0,
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor='#2F2F4F' stopOpacity={0.96} />
            <stop offset="20%" stopColor='#2F2F4F' stopOpacity={0.7} />
            <stop offset="50%" stopColor='#2F2F4F' stopOpacity={0.5} />
            <stop offset="95%" stopColor='#191F2D' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => dayjs(time * 1000).format('MM-DD HH:mm')}
          minTickGap={10}
          padding={{ left: 40 }}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          tickFormatter={(val) => `${formatAmount(val)}`}
          orientation="left"
          tick={{ dx: 10, fill: theme.colors.textSubtle }}
          padding={{ top: 10, bottom: 10 }}
        />
        <Tooltip
          cursor={false}
          content={(props) => (
            <CustomTooltip
              locale={locale}
              payload={props.payload}
              setHoverValue={setHoverValue}
              setHoverDate={setHoverDate}
            />
          )}
        />
        <Area
          dataKey="value"
          type="monotone"
          stroke='#8766d3d1'
          activeDot={{ stroke: '#2BEC93', strokeWidth: 2, r: 6 }}
          fill="url(#gradient)"
          strokeWidth={2}
          animationDuration={500}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
