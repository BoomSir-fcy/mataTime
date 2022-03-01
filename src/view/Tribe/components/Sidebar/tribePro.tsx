import React from 'react';
import styled from 'styled-components';
import { Card, Flex, Box, Text } from 'uikit';
import { useStore } from 'store';

const Group = styled(Box)``;
const GroupRows = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TribePro = ({ ...props }) => {
  const tribeDetails = useStore(p => p.tribe.tribeDetails);

  return (
    <Card padding='16px' isRadius {...props}>
      <Text mb='20px' fontSize='18px' fontWeight='bold'>
        Pro Information
      </Text>
      <Group>
        <GroupRows>
          <Text color='textTips'>Fees to join this tribe</Text>
          <Text>
            {tribeDetails.charge} {tribeDetails.symbol}
          </Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>Timing Method</Text>
        </GroupRows>
      </Group>
      <Text mb='14px'>Timed by joining the tribe</Text>
      <Group>
        <GroupRows>
          <Text color='textTips'>Validity Days</Text>
          <Text>{tribeDetails.valid_time} days</Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>TIME Burned</Text>
          <Text>{tribeDetails.spend_time} TIME/s</Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>
            TIME Reward Distribution for Content Producers
          </Text>
        </GroupRows>
      </Group>
      <Text>Tribe Host: {tribeDetails.reward_master}%</Text>
      <Text>Poster: {tribeDetails.reward_author}%</Text>
      <Text>Members: {tribeDetails.reward_member}%</Text>
    </Card>
  );
};

export default TribePro;
