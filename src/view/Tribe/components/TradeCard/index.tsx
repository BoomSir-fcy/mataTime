import React from 'react';
import { Card, Box, Image, Text } from 'uikit';
import styled from 'styled-components';
import TradeLogo from './TradeLogo';
import { ProfileMenu } from 'components/MenuNav/ProfileMenu';

const CardStyle = styled(Card)`
  max-width: max-content;
`;

const PaddingBox = styled(Box)`
  padding: 16px;
`;

interface TradeCardProps {
  logo?: string;
  title?: string;
  id?: number;
  uId?: number;
  user_address?: string;
  user_avator_url?: string;
  user_name?: string;
}
const TradeCard: React.FC<TradeCardProps> = ({}) => {
  return (
    <CardStyle isRadius mb='16px'>
      <PaddingBox>
        <TradeLogo
          scales='lg'
          logo='https://api.dsgmetaverse.com/gphoto/mngen/4411022.png'
        />
        <Text padding='14px 0' bold fontSize='18px'>
          1111
        </Text>
        <ProfileMenu ShowIcon={false} />
      </PaddingBox>
    </CardStyle>
  );
};

export default TradeCard;
