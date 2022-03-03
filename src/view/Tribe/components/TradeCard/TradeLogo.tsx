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

const ProBox = styled(Box)<{ scale?: Scales }>`
  background: ${({ theme }) => theme.colors.background};
  width: 35%;
  min-width: ${({ scale }) => `${style[scale].iconMinWidth}px`};
  text-align: center;
  position: absolute;
  left: -23px;
  top: ${({ scale }) => `${style[scale].iconTop}px`};
  transform: rotate(-45deg);
  z-index: 1;
`;

const Crown = styled(ProTribeIcon)<{ scale: Scales }>`
  width: ${({ scale }) => `${style[scale].iconWidth}px`};
  height: ${({ scale }) => `${style[scale].iconWidth}px`};
`;

export const scales = {
  LD: 'ld',
  XS: 'xs',
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
    iconWidth: 12,
    iconMinWidth: 70,
    iconTop: 4,
  },
  [scales.XS]: {
    height: 50,
    width: 50,
    minWidth: 50,
    minHeight: 50,
    iconWidth: 12,
    iconMinWidth: 70,
    iconTop: 4,
  },
  [scales.SM]: {
    height: 100,
    width: 100,
    minWidth: 50,
    minHeight: 50,
    iconWidth: 12,
    iconMinWidth: 70,
    iconTop: 4,
  },
  [scales.MD]: {
    height: 190,
    width: 190,
    minWidth: 190,
    minHeight: 190,
    iconWidth: 22,
    iconMinWidth: 90,
    iconTop: 10,
  },
  [scales.LG]: {
    height: 280,
    width: 280,
    minWidth: 190,
    minHeight: 190,
    iconWidth: 22,
    iconMinWidth: 90,
    iconTop: 10,
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
          <ProBox scale={scales}>
            <Crown scale={scales} />
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
