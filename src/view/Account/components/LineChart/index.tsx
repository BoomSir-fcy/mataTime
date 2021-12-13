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

interface LineChartProps {
  data: any[]
  load: number
}

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ locale, payload }) => {

  useEffect(() => {
  }, [locale, payload.value, payload.time])
  return null
}

const CustomTooltip = ({ locale, payload }) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (payload && payload.length) {
    }
  }, [locale, payload[0], payload[0]])
  if (payload && payload.length) {
    return (
      <TooltipBox>
        <div>{t('AccountTime')}:{payload[0].payload.time}</div>
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
const LineChart: React.FC<LineChartProps> = ({ data, load }) => {
  const {
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()
  if (!data || data.length === 0) {
    return <LineChartLoader load={load} />
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
          left: 0,
          bottom: 0,
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
          tickFormatter={(time) => time}
          minTickGap={10}
          padding={{ left: 5 }}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          tickFormatter={(val) => `${formatAmount(val)}`}
          tick={{ fill: theme.colors.textSubtle }}
          padding={{ top: 10, bottom: 10 }}
          domain={[0, 'dataMax']}
        />
        <Tooltip
          cursor={false}
          content={(props) => (
            <CustomTooltip
              locale={locale}
              payload={props.payload}
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
