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
  Token: string
  Balance: number
  TokenAddr: string
  BalanceInfo: Api.Account.Balance
}
const Chart: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [liquidityDateHover, setLiquidityDateHover] = useState<string | undefined>()

  const chartData = [
    {
      date: 1635758812,
      val: 32
    },
    {
      date: 1635845212,
      val: 42
    },
    {
      date: 1635931612,
      val: 51
    },
    {
      date: 1636018012,
      val: 32
    },
    {
      date: 1636104412,
      val: 77
    },
    {
      date: 1636190812,
      val: 80
    },
    {
      date: 1636277212,
      val: 10
    }
  ]

  const formattedLiquidityData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: day.date,
          value: day.val,
        }
      })
    }
    return []
  }, [chartData])
  return (
    <ChartsBox>
      <Text color='textTips'>近7日内容收益趋势</Text>
      <Box height="360px">
        <LineChart
          data={formattedLiquidityData}
          setHoverValue={setLiquidityHover}
          setHoverDate={setLiquidityDateHover}
        />
      </Box>
    </ChartsBox>
  )
}

export default Chart;