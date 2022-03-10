import React from 'react';
import { Card, Box, Image, Text } from 'uikit';
import styled from 'styled-components';
import TradeLogo from './TradeLogo';
import { TribeList } from 'store/tribe/type';
import { TribeProfileMenu } from '../ProfileMenu';

const CardStyle = styled(Card)`
  max-width: 312px;
  min-width: 184px;
`;

const PaddingBox = styled(Box)`
  padding: 16px;
`;

interface TradeCardProps {
  info?: TribeList;
}
const TradeCard: React.FC<TradeCardProps> = ({ info }) => {
  return (
    <CardStyle isRadius mb='16px'>
      <PaddingBox>
        <TradeLogo scales='lg' pro={info.type === 2} logo={info.logo} />
        <Text padding='14px 0' bold fontSize='18px' ellipsis>
          {info.name}
        </Text>
        <TribeProfileMenu
          nick_name={info.nick_name}
          address={info.address}
          nft_image={info.nft_image}
        />
      </PaddingBox>
    </CardStyle>
  );
};

export default TradeCard;
