import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Flex, Box, Text, Image, Button, Heading, CloseLineIcon } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';
import LineChart from '../LineChart';
import dayjs from 'dayjs'


const ChartsBox = styled(Box)`
${({ theme }) => theme.mediaQueriesSize.padding}
${({ theme }) => theme.mediaQueriesSize.marginb}

/* background: linear-gradient(180deg, #2F2F4F, #191F2D);
opacity: 0.96; */
`

interface Init {
  type?: number
  token?: number,
  chartData: any,
  load: number
}
const Chart: React.FC<Init> = ({ type, token, chartData, load }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [liquidityDateHover, setLiquidityDateHover] = useState<string | undefined>()


  const formattedLiquidityData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: day.date,
          value: day.income,
        }
      })
    }
  }, [chartData])
  return (
    <ChartsBox>
      <Text color='textTips'>{t('Account Earnings trend in the past 7 days')}</Text>
      <Box height="360px">
        <LineChart
          data={formattedLiquidityData}
          load={load}
        />
      </Box>
    </ChartsBox>
  )
}

export default Chart;