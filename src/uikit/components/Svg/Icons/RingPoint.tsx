import React from 'react';
import styled from 'styled-components';
import Svg from '../Svg';
import { SvgProps } from '../types';
import getThemeValue from 'uikit/util/getThemeValue';

const Icon: React.FC<SvgProps> = props => {
  return (
    <Svg viewBox='0 0 1000 539' {...props}>
      <path
        d='M237 3H737'
        stroke='url(#paint0_linear_318_2277)'
        stroke-width='5'
        stroke-dasharray='2 50'
      />
      <path
        d='M62.5 161H906.5'
        stroke='url(#paint1_linear_318_2277)'
        stroke-width='5'
        stroke-dasharray='2 50'
      />
      <path
        d='M0 265H1000'
        stroke='url(#paint2_linear_318_2277)'
        stroke-width='5'
        stroke-dasharray='2 50'
      />
      <path
        d='M62.5 363H906.5'
        stroke='url(#paint3_linear_318_2277)'
        stroke-width='5'
        stroke-dasharray='2 50'
      />
      <path
        d='M237 536H737'
        stroke='url(#paint4_linear_318_2277)'
        stroke-width='5'
        stroke-dasharray='2 50'
      />
      <defs>
        <linearGradient
          id='paint0_linear_318_2277'
          x1='487'
          y1='3'
          x2='487'
          y2='4'
          gradientUnits='userSpaceOnUse'
        >
          <stop className='stop' stop-color='white' />
          <stop
            className='stop'
            offset='0.46875'
            stop-color='white'
            stop-opacity='0'
          />
          <stop className='stop' offset='1' stop-color='white' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_318_2277'
          x1='484.5'
          y1='161'
          x2='484.5'
          y2='162'
          gradientUnits='userSpaceOnUse'
        >
          <stop className='stop' stop-color='white' />
          <stop
            className='stop'
            offset='0.46875'
            stop-color='white'
            stop-opacity='0'
          />
          <stop className='stop' offset='1' stop-color='white' />
        </linearGradient>
        <linearGradient
          id='paint2_linear_318_2277'
          x1='500'
          y1='265'
          x2='500'
          y2='266'
          gradientUnits='userSpaceOnUse'
        >
          <stop className='stop' stop-color='white' />
          <stop
            className='stop'
            offset='0.46875'
            stop-color='white'
            stop-opacity='0'
          />
          <stop className='stop' offset='1' stop-color='white' />
        </linearGradient>
        <linearGradient
          id='paint3_linear_318_2277'
          x1='484.5'
          y1='363'
          x2='484.5'
          y2='364'
          gradientUnits='userSpaceOnUse'
        >
          <stop className='stop' stop-color='white' />
          <stop
            className='stop'
            offset='0.46875'
            stop-color='white'
            stop-opacity='0'
          />
          <stop className='stop' offset='1' stop-color='white' />
        </linearGradient>
        <linearGradient
          id='paint4_linear_318_2277'
          x1='487'
          y1='536'
          x2='487'
          y2='537'
          gradientUnits='userSpaceOnUse'
        >
          <stop className='stop' stop-color='white' />
          <stop
            className='stop'
            offset='0.46875'
            stop-color='white'
            stop-opacity='0'
          />
          <stop className='stop' offset='1' stop-color='white' />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;

export const BgSvg = styled(Icon)`
  .stop {
    stop-color: ${({ theme, color }) =>
      getThemeValue(`colors.${color}`, color)(theme)};
  }
`;
