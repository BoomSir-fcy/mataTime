import React from 'react';
import { Card, Box, Image, Text } from 'uikit';
import TradeLogo from './TradeLogo';

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
    <Card>
      <TradeLogo
        scales='lg'
        logo='https://api.dsgmetaverse.com/gphoto/gen/9A520885.png'
      />
      <Text>1111</Text>
    </Card>
  );
};

export default TradeCard;
