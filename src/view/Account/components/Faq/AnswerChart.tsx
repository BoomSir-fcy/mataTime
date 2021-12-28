import React, { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Text, Flex, Box, TextProps } from 'uikit';
import { chartData } from './data';

const BoxContener = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${({ theme }) => theme.mediaQueriesSize.padding}
  .pie-chart {
    overflow-y: hidden;
    ${({ theme }) => theme.mediaQueries.lg} {
      overflow: hidden;
    }
  }
`;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value, percent, name, white_black } =
    props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 20) * cos;
  const sy = cy + (outerRadius - 20) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 240;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const dx = cos * 5;
  const dy = sin * 5;

  return (
    <g>
      <path
        d={`M${sx + dx},${sy + dy}L${mx},${my}L${ex},${ey}`}
        stroke='#fff'
        fill='none'
      />
      <circle
        cx={sx}
        cy={sy}
        r={4}
        strokeWidth='2'
        stroke='#fff'
        fill='transparent'
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * -180}
        y={ey - 12}
        textAnchor={textAnchor}
        fill='#fff'
      >{`${name} ${(percent * 100).toFixed(2)}%)`}</text>
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};
export default function AnswerChart() {
  const white_black = useTheme().colors.white_black;

  return (
    <BoxContener mt='32px'>
      <Text bold fontSize='24px'>
        Distribution of $TIME
      </Text>
      <Flex justifyContent='center'>
        <PieChart
          margin={{ left: 300 }}
          width={1000}
          height={360}
          className='pie-chart'
        >
          <Pie
            data={chartData}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            startAngle={20}
            endAngle={380}
            className='pie'
          >
            {chartData.map((entry, index) => (
              // eslint-disable-next-line
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Flex>
    </BoxContener>
  );
}
