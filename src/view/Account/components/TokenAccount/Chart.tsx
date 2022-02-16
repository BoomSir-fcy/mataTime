import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Flex, Box, Text, Image, Button, Heading, CloseLineIcon } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';
import LineChart from '../LineChart';
import dayjs from 'dayjs';

const ChartsBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding};
  width: '100%';
`;

interface chartDataInfo {
  date: string;
  income: string;
  uid: number;
}
interface Init {
  type?: number;
  token?: number;
  chartData: chartDataInfo[];
  load: number;
}
const Chart: React.FC<Init> = ({ type, token, chartData, load }) => {
  const { t } = useTranslation();

  const formattedData = useMemo(() => {
    if (chartData) {
      const data = chartData.map(day => {
        return {
          time: day.date,
          value: Number(day.income),
        };
      });
      if (type === 1) {
        return data.reverse();
      } else {
        return data;
      }
    }
  }, [chartData, type]);

  return (
    <ChartsBox>
      <Text color='textTips'>
        {t('Account Earnings trend in the past 7 days')}
      </Text>
      <Box width='100%' height='360px'>
        <LineChart data={formattedData} load={load} />
      </Box>
    </ChartsBox>
  );
};

export default Chart;
