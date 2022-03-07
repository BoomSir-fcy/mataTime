import React from 'react';
import styled from 'styled-components';
import { Box, Image, ProTribeIcon } from 'uikit';
import { BASE_IMAGE_URL } from 'config';

const CardContent = styled(Box)`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.card};
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
  [scales.MD]: {
    height: 115,
    width: 115,
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

//  todo 需要优化
const TribeLogo: React.FC<TradeLogoProps> = ({ scales, round, logo, pro }) => {
  return (
    <CardContent
      width={`${style[scales].width}px`}
      height={`${style[scales].height}px`}
    >
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
    </CardContent>
  );
};

TribeLogo.defaultProps = {
  scales: scales.MD,
};

export default TribeLogo;
