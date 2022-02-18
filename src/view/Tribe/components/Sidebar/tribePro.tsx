import React from 'react';
import styled from 'styled-components';
import { Card, Flex, Box, Text } from 'uikit';

const Group = styled(Box)``;
const GroupRows = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TribePro = ({ ...props }) => {
  return (
    <Card padding='16px' isRadius {...props}>
      <Text mb='20px' fontSize='18px' fontWeight='bold'>
        Pro Information
      </Text>
      <Group>
        <GroupRows>
          <Text color='textTips'>Fees to join this tribe</Text>
          <Text>5.0 BNB</Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>Timing Method</Text>
        </GroupRows>
      </Group>
      <Text mb='14px'>Timed by joining the tribe</Text>
      <Group>
        <GroupRows>
          <Text color='textTips'>Validity Days</Text>
          <Text>365 days</Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>TIME Burned</Text>
          <Text>10 TIME/s</Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>
            TIME Reward Distribution for Content Producers
          </Text>
        </GroupRows>
      </Group>
      <Text>Tribe Host: 50% </Text>
      <Text>Poster: 30% </Text>
      <Text>Members: 20%</Text>
    </Card>
  );
};

export default TribePro;
