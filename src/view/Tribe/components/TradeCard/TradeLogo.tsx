import React from 'react';
import { Card, Box, Image, Text } from 'uikit';
import styled from 'styled-components';

const BoxStyled = styled(Box)<{ scale: Scales }>`
  width: 20vw;
  height: 20vw;
  min-width: ${({ scale }) => `${style[scale].minWidth}px`};
  min-height: ${({ scale }) => `${style[scale].minHeight}px`};
`;

export const scales = {
  LD: 'ld',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type Scales = typeof scales[keyof typeof scales];

const style = {
  [scales.LD]: {
    height: 24,
    width: 24,
    minWidth: 24,
    minHeight: 24,
  },
  [scales.SM]: {
    height: 100,
    width: 100,
    minWidth: 50,
    minHeight: 50,
  },
  [scales.MD]: {
    height: 190,
    width: 190,
    minWidth: 190,
    minHeight: 190,
  },
  [scales.LG]: {
    height: 280,
    width: 280,
    minWidth: 190,
    minHeight: 190,
  },
};

interface TradeLogoProps {
  logo?: string;
  scales?: Scales;
  round?: boolean;
}
const TradeLogo: React.FC<TradeLogoProps> = ({ scales, round, logo }) => {
  return (
    <Card isRadius={!round} style={round ? { borderRadius: '50%' } : {}}>
      <BoxStyled
        maxWidth={`${style[scales].width}px`}
        maxHeight={`${style[scales].height}px`}
        scale={scales}
      >
        <Image
          src={logo || 'https://api.dsgmetaverse.com/gphoto/mngen/4411022.png'}
          height={style[scales].height}
          width={style[scales].width}
        />
      </BoxStyled>
    </Card>
  );
};

TradeLogo.defaultProps = {
  scales: scales.MD,
};

export default TradeLogo;
