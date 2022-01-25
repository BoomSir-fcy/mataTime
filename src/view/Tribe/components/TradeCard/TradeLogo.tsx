import React from 'react';
import { Card, Box, Image, Text } from 'uikit';

export const scales = {
  // SM: 'sm',
  LD: 'ld',
  MD: 'md',
  LG: 'lg',
  // LX: 'lx',
  // XL: 'xl',
  // XLD: 'xld',
  // XXL: 'xxl',
  // XXXL: 'xxxl',
  // XXLD: 'xxld',
} as const;

export type Scales = typeof scales[keyof typeof scales];

const style = {
  [scales.LD]: {
    height: 14,
    width: 16,
  },
  [scales.MD]: {
    height: 190,
    width: 190,
  },
  [scales.LG]: {
    height: 280,
    width: 280,
  },
};

interface TradeLogoProps {
  logo?: string;
  scales?: Scales;
}
const TradeLogo: React.FC<TradeLogoProps> = ({ scales, logo }) => {
  return (
    <Card>
      <Box width={`${style[scales].width}px`}>
        <Image
          src={logo || 'https://api.dsgmetaverse.com/gphoto/gen/9A520885.png'}
          height={style[scales].height}
          width={style[scales].width}
        />
      </Box>
    </Card>
  );
};

TradeLogo.defaultProps = {
  scales: scales.MD,
};

export default TradeLogo;
