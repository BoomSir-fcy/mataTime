import React from 'react';
import getThemeValue from 'uikit/util/getThemeValue';
import styled from 'styled-components';
import Svg from '../Svg';
import { SvgProps } from '../types';

const SvgStroke = styled(Svg)`
  stroke: ${({ theme, color }) =>
    getThemeValue(`colors.${color}`, color)(theme)};
  fill: none;
`;
const Icon: React.FC<SvgProps> = props => {
  return (
    <SvgStroke width='371' height='371' viewBox='0 0 371 371' {...props}>
      <circle
        cx='185.5'
        cy='185.5'
        r='185.25'
        strokeOpacity='0.6'
        strokeWidth='0.5'
        strokeDasharray='1 3'
      />
      <circle
        cx='185.5'
        cy='185.5'
        r='176.25'
        strokeOpacity='0.6'
        strokeWidth='0.5'
        strokeDasharray='1 3'
      />
      <circle
        cx='185.5'
        cy='185.5'
        r='166.25'
        strokeOpacity='0.6'
        strokeWidth='0.5'
        strokeDasharray='1 3'
      />
      <circle
        cx='185.5'
        cy='185.5'
        r='156.25'
        strokeOpacity='0.6'
        strokeWidth='0.5'
        strokeDasharray='1 3'
      />
    </SvgStroke>
  );
};

export default Icon;
