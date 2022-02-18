import React from 'react';
import { Card, Box, Image, Text, ProTribeIcon } from 'uikit';
import styled from 'styled-components';
import { Icon } from 'components';

const BoxStyled = styled(Box)<{ scale: Scales }>`
  width: 20vw;
  height: 20vw;
  min-width: ${({ scale }) => `${style[scale].minWidth}px`};
  min-height: ${({ scale }) => `${style[scale].minHeight}px`};
  position: relative;
`;

const ProBox = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  width: 35%;
  min-width: 90px;
  text-align: center;
  position: absolute;
  left: -23px;
  top: 10px;
  transform: rotate(-45deg);
  z-index: 1;
`;

const Crown = styled(ProTribeIcon)`
  width: 22px;
  height: 22px;
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
  pro?: boolean;
}
const TradeLogo: React.FC<TradeLogoProps> = ({ scales, round, logo, pro }) => {
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
        {pro && (
          <ProBox>
            <Crown />
          </ProBox>
        )}
      </BoxStyled>
    </Card>
  );
};

TradeLogo.defaultProps = {
  scales: scales.MD,
};

export default TradeLogo;
