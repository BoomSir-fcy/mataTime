import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { Card, Box, Image, Text, ProTribeIcon } from 'uikit';
import { Icon } from 'components';
import { BASE_IMAGE_URL } from 'config';

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
    mobileWidth: 24,
    iconWidth: 12,
    iconMinWidth: 70,
    iconTop: 4,
  },
  [scales.XS]: {
    height: 50,
    width: 50,
    mobileWidth: 50,
    iconWidth: 12,
    iconMinWidth: 70,
    iconTop: 4,
  },
  [scales.SM]: {
    height: 100,
    width: 100,
    mobileWidth: 100,
    iconWidth: 12,
    iconMinWidth: 70,
    iconTop: 4,
  },
  [scales.MD]: {
    height: 190,
    width: 190,
    mobileWidth: 120,
    iconWidth: 22,
    iconMinWidth: 90,
    iconTop: 10,
  },
  [scales.LG]: {
    height: 280,
    width: 280,
    mobileWidth: 152,
    iconWidth: 22,
    iconMinWidth: 90,
    iconTop: 10,
  },
};

const BoxStyled = styled(Box)<{ scale: Scales; round: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme, round }) => (round ? '' : theme.radii.card)};
  width: ${props => style[props.scale].mobileWidth}px;
  height: auto;
  ${({ theme }) => theme.mediaQueries.md} {
    width: ${props => style[props.scale].width}px;
    height: ${props => style[props.scale].height}px;
  }
`;

const ProBox = styled(Box)<{ scale?: Scales }>`
  background: ${({ theme }) => theme.colors.primaryDark};
  width: 35%;
  min-width: ${({ scale }) => `${style[scale].iconMinWidth}px`};
  text-align: center;
  position: absolute;
  left: -23px;
  top: ${({ scale }) => `${style[scale].iconTop}px`};
  transform: rotate(-45deg);
  z-index: 1;
`;

const SpeedTime = styled(Box)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Mask = styled(Box)`
  padding: 2px 10px;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: ${({ theme }) => theme.radii.card};
`;

const Crown = styled(ProTribeIcon)<{ scale: Scales }>`
  width: ${({ scale }) => `${style[scale].iconWidth}px`};
  height: ${({ scale }) => `${style[scale].iconWidth}px`};
`;
interface TradeLogoProps {
  logo?: string;
  scales?: Scales;
  round?: boolean;
  pro?: boolean;
  spend_time?: number | string;
}

const TradeLogo: React.FC<TradeLogoProps> = ({
  scales,
  round,
  logo,
  pro,
  spend_time,
}) => {
  return (
    <BoxStyled scale={scales} round={round}>
      <Image
        src={`${BASE_IMAGE_URL}${logo}`}
        height={style[scales].height}
        width={style[scales].width}
      />
      {pro && (
        <ProBox scale={scales}>
          <Crown scale={scales} />
        </ProBox>
      )}
      {Boolean(spend_time) && (
        <SpeedTime>
          <Mask>
            <Text>10 TIME/s</Text>
          </Mask>
        </SpeedTime>
      )}
    </BoxStyled>
  );
};

TradeLogo.defaultProps = {
  scales: scales.MD,
};

export default TradeLogo;
