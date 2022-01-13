import { AsyncLocalStorage } from 'async_hooks';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Flex } from 'uikit';
import styled, { keyframes, useTheme } from 'styled-components';
import Box from '../../Box/Box';
import Svg from '../Svg';
import { SvgProps } from '../types';
import getThemeValue from 'uikit/util/getThemeValue';

const SvgColor = styled(Svg)`
  stroke: ${({ theme, color }) =>
    getThemeValue(`colors.${color}`, color)(theme)};
`;
const Icon: React.FC<SvgProps> = props => {
  return (
    <SvgColor viewBox='0 0 141 141' {...props}>
      <circle
        fill='none'
        className='svg-ring1'
        strokeWidth='0.3239'
        strokeDasharray='1.3 1.3'
        cx='70.2'
        cy='70.2'
        r='70'
      />
      <path
        fill='none'
        strokeWidth='0.3239'
        strokeOpacity='0.5'
        d='M71.1,137.2c-37.6,0-68-30.2-68-67.5c0-37.3,30.5-67.5,68-67.5c37.6,0,68,30.2,68,67.5
	C139.2,107,108.7,137.2,71.1,137.2z'
      />
      <path
        fill='none'
        strokeWidth='0.3239'
        strokeOpacity='0.5'
        d='M70.4,136.7c-36.6,0-66.3-29.8-66.3-66.5c0-36.8,29.7-66.5,66.3-66.5c36.6,0,66.3,29.8,66.3,66.5
	C136.7,106.9,107,136.7,70.4,136.7z'
      />
      <path
        fill='none'
        className='svg-ring1'
        strokeWidth='0.3239'
        strokeOpacity='0.5'
        strokeDasharray='1.3 1.3'
        d='M72.1,135.9c-0.4,0-0.9,0-1.3,0l0-0.2c-0.2,0-0.4,0-0.7,0c-0.2,0-0.4,0-0.7,0l0,0.2c-0.4,0-0.9,0-1.3,0l0-0.2
	c-0.4,0-0.9,0-1.3-0.1l0,0.2c-0.4,0-0.9,0-1.3-0.1l0-0.2c-0.4,0-0.9-0.1-1.3-0.1l0,0.2c-0.4,0-0.9-0.1-1.3-0.1l0-0.2
	c-0.4,0-0.9-0.1-1.3-0.2l0,0.2c-0.4-0.1-0.9-0.1-1.3-0.2l0-0.2c-0.4-0.1-0.9-0.1-1.3-0.2l0,0.2c-0.4-0.1-0.9-0.2-1.3-0.2l0-0.2
	c-0.4-0.1-0.9-0.2-1.3-0.3l0,0.2c-0.4-0.1-0.9-0.2-1.3-0.3l0-0.2c-0.4-0.1-0.8-0.2-1.3-0.3l0,0.2c-0.4-0.1-0.8-0.2-1.3-0.3l0-0.2
	c-0.4-0.1-0.8-0.2-1.3-0.4l0,0.2c-0.4-0.1-0.8-0.3-1.2-0.4l0.1-0.2c-0.4-0.1-0.8-0.3-1.2-0.4l-0.1,0.2c-0.4-0.1-0.8-0.3-1.2-0.4
	l0.1-0.2c-0.4-0.2-0.8-0.3-1.2-0.5l-0.1,0.2c-0.4-0.2-0.8-0.3-1.2-0.5l0.1-0.1c-0.4-0.2-0.8-0.3-1.2-0.5l-0.1,0.1
	c-0.4-0.2-0.8-0.4-1.2-0.5l0.1-0.1c-0.4-0.2-0.8-0.4-1.2-0.6l-0.1,0.1c-0.4-0.2-0.8-0.4-1.2-0.6l0.1-0.1c-0.4-0.2-0.8-0.4-1.2-0.6
	l-0.1,0.1c-0.4-0.2-0.8-0.4-1.1-0.6l0.1-0.1c-0.4-0.2-0.8-0.4-1.1-0.7l-0.1,0.1c-0.4-0.2-0.7-0.5-1.1-0.7l0.1-0.1
	c-0.4-0.2-0.7-0.5-1.1-0.7l-0.1,0.1c-0.4-0.2-0.7-0.5-1.1-0.7l0.1-0.1c-0.4-0.2-0.7-0.5-1.1-0.7l-0.1,0.1c-0.4-0.3-0.7-0.5-1.1-0.8
	l0.1-0.1c-0.3-0.3-0.7-0.5-1-0.8l-0.1,0.1c-0.3-0.3-0.7-0.5-1-0.8l0.1-0.1c-0.3-0.3-0.7-0.6-1-0.8l-0.1,0.1c-0.3-0.3-0.7-0.6-1-0.9
	l0.1-0.1c-0.3-0.3-0.7-0.6-1-0.9l-0.1,0.1c-0.3-0.3-0.6-0.6-1-0.9l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1
	c-0.3-0.3-0.6-0.6-0.9-0.9l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1c-0.3-0.3-0.6-0.6-0.9-1l0.1-0.1c-0.3-0.3-0.6-0.7-0.9-1
	l-0.1,0.1c-0.3-0.3-0.6-0.7-0.8-1l0.1-0.1c-0.3-0.3-0.6-0.7-0.8-1l-0.1,0.1c-0.3-0.3-0.5-0.7-0.8-1l0.1-0.1c-0.3-0.3-0.5-0.7-0.8-1
	l-0.1,0.1c-0.3-0.4-0.5-0.7-0.8-1.1l0.1-0.1c-0.2-0.4-0.5-0.7-0.7-1.1l-0.1,0.1c-0.2-0.4-0.5-0.7-0.7-1.1l0.1-0.1
	c-0.2-0.4-0.5-0.7-0.7-1.1l-0.1,0.1c-0.2-0.4-0.5-0.7-0.7-1.1l0.1-0.1c-0.2-0.4-0.4-0.8-0.6-1.1l-0.1,0.1c-0.2-0.4-0.4-0.8-0.6-1.1
	l0.1-0.1c-0.2-0.4-0.4-0.8-0.6-1.2l-0.1,0.1c-0.2-0.4-0.4-0.8-0.6-1.2l0.1-0.1c-0.2-0.4-0.4-0.8-0.6-1.2l-0.1,0.1
	c-0.2-0.4-0.4-0.8-0.5-1.2l0.1-0.1c-0.2-0.4-0.3-0.8-0.5-1.2l-0.1,0.1c-0.2-0.4-0.3-0.8-0.5-1.2l0.2-0.1c-0.2-0.4-0.3-0.8-0.5-1.2
	l-0.2,0.1c-0.1-0.4-0.3-0.8-0.4-1.2l0.2-0.1c-0.1-0.4-0.3-0.8-0.4-1.2l-0.2,0c-0.1-0.4-0.3-0.8-0.4-1.3l0.2,0
	c-0.1-0.4-0.2-0.8-0.4-1.3l-0.2,0c-0.1-0.4-0.2-0.8-0.3-1.3l0.2,0c-0.1-0.4-0.2-0.8-0.3-1.3l-0.2,0c-0.1-0.4-0.2-0.9-0.3-1.3l0.2,0
	c-0.1-0.4-0.2-0.9-0.3-1.3l-0.2,0c-0.1-0.4-0.2-0.9-0.2-1.3l0.2,0c-0.1-0.4-0.1-0.9-0.2-1.3l-0.2,0C6.1,80,6,79.6,6,79.1l0.2,0
	C6.1,78.7,6,78.3,6,77.8l-0.2,0c0-0.4-0.1-0.9-0.1-1.3l0.2,0c0-0.4-0.1-0.9-0.1-1.3l-0.2,0c0-0.4-0.1-0.9-0.1-1.3l0.2,0
	c0-0.4,0-0.9-0.1-1.3l-0.2,0c0-0.4,0-0.9,0-1.3l0.2,0c0-0.2,0-0.4,0-0.7c0-0.2,0-0.4,0-0.7l-0.2,0c0-0.4,0-0.9,0-1.3l0.2,0
	c0-0.4,0-0.9,0.1-1.3l-0.2,0c0-0.4,0-0.9,0.1-1.3l0.2,0c0-0.4,0.1-0.9,0.1-1.3l-0.2,0c0-0.4,0.1-0.9,0.1-1.3l0.2,0
	c0-0.4,0.1-0.9,0.2-1.3l-0.2,0c0.1-0.4,0.1-0.9,0.2-1.3l0.2,0c0.1-0.4,0.1-0.9,0.2-1.3l-0.2,0c0.1-0.4,0.2-0.9,0.2-1.3l0.2,0
	C6.8,57.9,6.9,57.5,7,57l-0.2,0c0.1-0.4,0.2-0.9,0.3-1.3l0.2,0c0.1-0.4,0.2-0.8,0.3-1.3l-0.2,0c0.1-0.4,0.2-0.8,0.3-1.3l0.2,0
	C8,52.8,8.2,52.4,8.3,52l-0.2,0c0.1-0.4,0.3-0.8,0.4-1.3l0.2,0c0.1-0.4,0.3-0.8,0.4-1.2l-0.2-0.1c0.1-0.4,0.3-0.8,0.4-1.2l0.2,0.1
	c0.1-0.4,0.3-0.8,0.5-1.2L9.8,47c0.2-0.4,0.3-0.8,0.5-1.2l0.1,0.1c0.2-0.4,0.3-0.8,0.5-1.2l-0.1-0.1c0.2-0.4,0.4-0.8,0.5-1.2
	l0.1,0.1c0.2-0.4,0.4-0.8,0.6-1.2l-0.1-0.1c0.2-0.4,0.4-0.8,0.6-1.2l0.1,0.1c0.2-0.4,0.4-0.8,0.6-1.2l-0.1-0.1
	c0.2-0.4,0.4-0.8,0.6-1.1l0.1,0.1c0.2-0.4,0.4-0.8,0.6-1.1l-0.1-0.1c0.2-0.4,0.4-0.8,0.7-1.1l0.1,0.1c0.2-0.4,0.5-0.7,0.7-1.1
	l-0.1-0.1c0.2-0.4,0.5-0.7,0.7-1.1l0.1,0.1c0.2-0.4,0.5-0.7,0.7-1.1l-0.1-0.1c0.2-0.4,0.5-0.7,0.8-1.1l0.1,0.1
	c0.3-0.4,0.5-0.7,0.8-1L18.7,31c0.3-0.3,0.5-0.7,0.8-1l0.1,0.1c0.3-0.3,0.5-0.7,0.8-1L20.3,29c0.3-0.3,0.6-0.7,0.8-1l0.1,0.1
	c0.3-0.3,0.6-0.7,0.9-1L22,27c0.3-0.3,0.6-0.6,0.9-1l0.1,0.1c0.3-0.3,0.6-0.6,0.9-0.9l-0.1-0.1c0.3-0.3,0.6-0.6,0.9-0.9l0.1,0.1
	c0.3-0.3,0.6-0.6,0.9-0.9l-0.1-0.1c0.3-0.3,0.6-0.6,1-0.9l0.1,0.1c0.3-0.3,0.6-0.6,1-0.9l-0.1-0.1c0.3-0.3,0.7-0.6,1-0.9l0.1,0.1
	c0.3-0.3,0.7-0.6,1-0.8l-0.1-0.1c0.3-0.3,0.7-0.5,1-0.8l0.1,0.1c0.3-0.3,0.7-0.5,1-0.8l-0.1-0.1c0.3-0.3,0.7-0.5,1.1-0.8l0.1,0.1
	c0.4-0.3,0.7-0.5,1.1-0.7l-0.1-0.1c0.4-0.2,0.7-0.5,1.1-0.7l0.1,0.1c0.4-0.2,0.7-0.5,1.1-0.7L36,15.2c0.4-0.2,0.7-0.5,1.1-0.7
	l0.1,0.1c0.4-0.2,0.7-0.4,1.1-0.7l-0.1-0.1c0.4-0.2,0.8-0.4,1.1-0.6l0.1,0.1c0.4-0.2,0.8-0.4,1.2-0.6l-0.1-0.1
	c0.4-0.2,0.8-0.4,1.2-0.6l0.1,0.1c0.4-0.2,0.8-0.4,1.2-0.6l-0.1-0.1c0.4-0.2,0.8-0.4,1.2-0.5l0.1,0.1c0.4-0.2,0.8-0.3,1.2-0.5
	l-0.1-0.1c0.4-0.2,0.8-0.3,1.2-0.5l0.1,0.2c0.4-0.2,0.8-0.3,1.2-0.5l-0.1-0.2C48.1,9.3,48.5,9.1,49,9L49,9.1
	c0.4-0.1,0.8-0.3,1.2-0.4l-0.1-0.2c0.4-0.1,0.8-0.3,1.2-0.4l0,0.2c0.4-0.1,0.8-0.2,1.3-0.4l0-0.2c0.4-0.1,0.8-0.2,1.3-0.3l0,0.2
	c0.4-0.1,0.8-0.2,1.3-0.3l0-0.2c0.4-0.1,0.9-0.2,1.3-0.3l0,0.2c0.4-0.1,0.9-0.2,1.3-0.3l0-0.2c0.4-0.1,0.9-0.2,1.3-0.2l0,0.2
	c0.4-0.1,0.9-0.1,1.3-0.2l0-0.2C60.8,6.1,61.2,6,61.7,6l0,0.2C62.1,6.1,62.6,6,63,6l0-0.2c0.4,0,0.9-0.1,1.3-0.1l0,0.2
	c0.4,0,0.9-0.1,1.3-0.1l0-0.2c0.4,0,0.9-0.1,1.3-0.1l0,0.2c0.4,0,0.9,0,1.3-0.1l0-0.2c0.4,0,0.9,0,1.3,0l0,0.2c0.2,0,0.4,0,0.7,0
	c0.2,0,0.4,0,0.7,0l0-0.2c0.4,0,0.9,0,1.3,0l0,0.2c0.4,0,0.9,0,1.3,0.1l0-0.2c0.4,0,0.9,0,1.3,0.1l0,0.2c0.4,0,0.9,0.1,1.3,0.1
	l0-0.2c0.4,0,0.9,0.1,1.3,0.1l0,0.2c0.4,0,0.9,0.1,1.3,0.2l0-0.2c0.4,0.1,0.9,0.1,1.3,0.2l0,0.2c0.4,0.1,0.9,0.1,1.3,0.2l0-0.2
	c0.4,0.1,0.9,0.2,1.3,0.2l0,0.2c0.4,0.1,0.9,0.2,1.3,0.3l0-0.2c0.4,0.1,0.9,0.2,1.3,0.3l0,0.2c0.4,0.1,0.8,0.2,1.3,0.3l0-0.2
	c0.4,0.1,0.8,0.2,1.3,0.3l0,0.2c0.4,0.1,0.8,0.2,1.3,0.4l0-0.2c0.4,0.1,0.8,0.3,1.2,0.4l-0.1,0.2c0.4,0.1,0.8,0.3,1.2,0.4L91.4,9
	c0.4,0.1,0.8,0.3,1.2,0.4l-0.1,0.2c0.4,0.2,0.8,0.3,1.2,0.5l0.1-0.2c0.4,0.2,0.8,0.3,1.2,0.5L95,10.5c0.4,0.2,0.8,0.3,1.2,0.5
	l0.1-0.1c0.4,0.2,0.8,0.4,1.2,0.5l-0.1,0.1c0.4,0.2,0.8,0.4,1.2,0.6l0.1-0.1c0.4,0.2,0.8,0.4,1.2,0.6l-0.1,0.1
	c0.4,0.2,0.8,0.4,1.2,0.6l0.1-0.1c0.4,0.2,0.8,0.4,1.1,0.6L102,14c0.4,0.2,0.8,0.4,1.1,0.7l0.1-0.1c0.4,0.2,0.7,0.5,1.1,0.7
	l-0.1,0.1c0.4,0.2,0.7,0.5,1.1,0.7l0.1-0.1c0.4,0.2,0.7,0.5,1.1,0.7l-0.1,0.1c0.4,0.2,0.7,0.5,1.1,0.7l0.1-0.1
	c0.4,0.3,0.7,0.5,1.1,0.8l-0.1,0.1c0.3,0.3,0.7,0.5,1,0.8l0.1-0.1c0.3,0.3,0.7,0.5,1,0.8l-0.1,0.1c0.3,0.3,0.7,0.6,1,0.8l0.1-0.1
	c0.3,0.3,0.7,0.6,1,0.9l-0.1,0.1c0.3,0.3,0.7,0.6,1,0.9l0.1-0.1c0.3,0.3,0.6,0.6,1,0.9l-0.1,0.1c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1
	c0.3,0.3,0.6,0.6,0.9,0.9l-0.1,0.1c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1c0.3,0.3,0.6,0.6,0.9,1l-0.1,0.1c0.3,0.3,0.6,0.7,0.9,1l0.1-0.1
	c0.3,0.3,0.6,0.7,0.8,1l-0.1,0.1c0.3,0.3,0.5,0.7,0.8,1l0.1-0.1c0.3,0.3,0.5,0.7,0.8,1l-0.1,0.1c0.3,0.3,0.5,0.7,0.8,1l0.1-0.1
	c0.3,0.4,0.5,0.7,0.8,1.1l-0.1,0.1c0.3,0.4,0.5,0.7,0.7,1.1l0.1-0.1c0.2,0.4,0.5,0.7,0.7,1.1l-0.1,0.1c0.2,0.4,0.5,0.7,0.7,1.1
	l0.1-0.1c0.2,0.4,0.5,0.7,0.7,1.1l-0.1,0.1c0.2,0.4,0.4,0.8,0.6,1.1l0.1-0.1c0.2,0.4,0.4,0.8,0.6,1.1l-0.1,0.1
	c0.2,0.4,0.4,0.8,0.6,1.2l0.1-0.1c0.2,0.4,0.4,0.8,0.6,1.2l-0.1,0.1c0.2,0.4,0.4,0.8,0.6,1.2l0.1-0.1c0.2,0.4,0.4,0.8,0.5,1.2
	l-0.1,0.1c0.2,0.4,0.3,0.8,0.5,1.2l0.1-0.1c0.2,0.4,0.3,0.8,0.5,1.2l-0.2,0.1c0.2,0.4,0.3,0.8,0.5,1.2l0.2-0.1
	c0.1,0.4,0.3,0.8,0.4,1.2l-0.2,0.1c0.1,0.4,0.3,0.8,0.4,1.2l0.2,0c0.1,0.4,0.3,0.8,0.4,1.3l-0.2,0c0.1,0.4,0.2,0.8,0.4,1.3l0.2,0
	c0.1,0.4,0.2,0.8,0.3,1.3l-0.2,0c0.1,0.4,0.2,0.8,0.3,1.3l0.2,0c0.1,0.4,0.2,0.9,0.3,1.3l-0.2,0c0.1,0.4,0.2,0.9,0.3,1.3l0.2,0
	c0.1,0.4,0.2,0.9,0.2,1.3l-0.2,0c0.1,0.4,0.1,0.9,0.2,1.3l0.2,0c0.1,0.4,0.1,0.9,0.2,1.3l-0.2,0c0.1,0.4,0.1,0.9,0.2,1.3l0.2,0
	c0,0.4,0.1,0.9,0.1,1.3l-0.2,0c0,0.4,0.1,0.9,0.1,1.3l0.2,0c0,0.4,0.1,0.9,0.1,1.3l-0.2,0c0,0.4,0,0.9,0.1,1.3l0.2,0
	c0,0.4,0,0.9,0,1.3l-0.2,0c0,0.2,0,0.4,0,0.7c0,0.2,0,0.4,0,0.7l0.2,0c0,0.4,0,0.9,0,1.3l-0.2,0c0,0.4,0,0.9-0.1,1.3l0.2,0
	c0,0.4,0,0.9-0.1,1.3l-0.2,0c0,0.4-0.1,0.9-0.1,1.3l0.2,0c0,0.4-0.1,0.9-0.1,1.3l-0.2,0c0,0.4-0.1,0.9-0.2,1.3l0.2,0
	c-0.1,0.4-0.1,0.9-0.2,1.3l-0.2,0c-0.1,0.4-0.1,0.9-0.2,1.3l0.2,0c-0.1,0.4-0.2,0.9-0.2,1.3l-0.2,0c-0.1,0.4-0.2,0.9-0.3,1.3l0.2,0
	c-0.1,0.4-0.2,0.9-0.3,1.3l-0.2,0c-0.1,0.4-0.2,0.8-0.3,1.3l0.2,0c-0.1,0.4-0.2,0.8-0.3,1.3l-0.2,0c-0.1,0.4-0.2,0.8-0.4,1.3l0.2,0
	c-0.1,0.4-0.3,0.8-0.4,1.3l-0.2,0c-0.1,0.4-0.3,0.8-0.4,1.2l0.2,0.1c-0.1,0.4-0.3,0.8-0.4,1.2l-0.2-0.1c-0.1,0.4-0.3,0.8-0.5,1.2
	l0.2,0.1c-0.2,0.4-0.3,0.8-0.5,1.2l-0.1-0.1c-0.2,0.4-0.3,0.8-0.5,1.2l0.1,0.1c-0.2,0.4-0.4,0.8-0.5,1.2l-0.1-0.1
	c-0.2,0.4-0.4,0.8-0.6,1.2l0.1,0.1c-0.2,0.4-0.4,0.8-0.6,1.2l-0.1-0.1c-0.2,0.4-0.4,0.8-0.6,1.2l0.1,0.1c-0.2,0.4-0.4,0.8-0.6,1.2
	l-0.1-0.1c-0.2,0.4-0.4,0.8-0.6,1.1l0.1,0.1c-0.2,0.4-0.4,0.8-0.7,1.1l-0.1-0.1c-0.2,0.4-0.5,0.7-0.7,1.1l0.1,0.1
	c-0.2,0.4-0.5,0.7-0.7,1.1l-0.1-0.1c-0.2,0.4-0.5,0.7-0.7,1.1l0.1,0.1c-0.3,0.4-0.5,0.7-0.8,1.1l-0.1-0.1c-0.3,0.4-0.5,0.7-0.8,1
	l0.1,0.1c-0.3,0.3-0.5,0.7-0.8,1l-0.1-0.1c-0.3,0.3-0.5,0.7-0.8,1l0.1,0.1c-0.3,0.3-0.6,0.7-0.8,1l-0.1-0.1c-0.3,0.3-0.6,0.7-0.9,1
	l0.1,0.1c-0.3,0.3-0.6,0.6-0.9,1l-0.1-0.1c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1c-0.3,0.3-0.6,0.6-0.9,0.9l-0.1-0.1
	c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1c-0.3,0.3-0.6,0.6-1,0.9l-0.1-0.1c-0.3,0.3-0.6,0.6-1,0.9l0.1,0.1c-0.3,0.3-0.7,0.6-1,0.9
	l-0.1-0.1c-0.3,0.3-0.7,0.6-1,0.8l0.1,0.1c-0.3,0.3-0.7,0.5-1,0.8l-0.1-0.1c-0.3,0.3-0.7,0.5-1,0.8l0.1,0.1
	c-0.3,0.3-0.7,0.5-1.1,0.8l-0.1-0.1c-0.4,0.3-0.7,0.5-1.1,0.7l0.1,0.1c-0.4,0.2-0.7,0.5-1.1,0.7l-0.1-0.1c-0.4,0.2-0.7,0.5-1.1,0.7
	l0.1,0.1c-0.4,0.2-0.7,0.5-1.1,0.7l-0.1-0.1c-0.4,0.2-0.7,0.4-1.1,0.7l0.1,0.1c-0.4,0.2-0.8,0.4-1.1,0.6l-0.1-0.1
	c-0.4,0.2-0.8,0.4-1.2,0.6l0.1,0.1c-0.4,0.2-0.8,0.4-1.2,0.6l-0.1-0.1c-0.4,0.2-0.8,0.4-1.2,0.6l0.1,0.1c-0.4,0.2-0.8,0.4-1.2,0.5
	l-0.1-0.1c-0.4,0.2-0.8,0.3-1.2,0.5l0.1,0.1c-0.4,0.2-0.8,0.3-1.2,0.5l-0.1-0.2c-0.4,0.2-0.8,0.3-1.2,0.5l0.1,0.2
	c-0.4,0.2-0.8,0.3-1.2,0.4l-0.1-0.2c-0.4,0.1-0.8,0.3-1.2,0.4l0.1,0.2c-0.4,0.1-0.8,0.3-1.2,0.4l0-0.2c-0.4,0.1-0.8,0.2-1.3,0.4
	l0,0.2c-0.4,0.1-0.8,0.2-1.3,0.3l0-0.2c-0.4,0.1-0.8,0.2-1.3,0.3l0,0.2c-0.4,0.1-0.8,0.2-1.3,0.3l0-0.2c-0.4,0.1-0.9,0.2-1.3,0.3
	l0,0.2c-0.4,0.1-0.9,0.2-1.3,0.2l0-0.2c-0.4,0.1-0.9,0.1-1.3,0.2l0,0.2c-0.4,0.1-0.9,0.1-1.3,0.2l0-0.2c-0.4,0.1-0.9,0.1-1.3,0.2
	l0,0.2c-0.4,0-0.9,0.1-1.3,0.1l0-0.2c-0.4,0-0.9,0.1-1.3,0.1l0,0.2c-0.4,0-0.9,0.1-1.3,0.1l0-0.2c-0.4,0-0.9,0-1.3,0.1L72.1,135.9z'
      />
      <circle
        fill='none'
        strokeWidth='0.3239'
        strokeOpacity='0.5'
        cx='70.2'
        cy='70.6'
        r='63.1'
      />
      <path
        fill='none'
        strokeWidth='0.3239'
        strokeDasharray='1.3 1.3'
        d='M72.3,132.4c-0.4,0-0.9,0-1.3,0l0-0.2c-0.2,0-0.4,0-0.6,0c-0.2,0-0.4,0-0.6,0l0,0.2c-0.4,0-0.9,0-1.3,0l0-0.2
	c-0.4,0-0.9,0-1.3-0.1l0,0.2c-0.4,0-0.9,0-1.3-0.1l0-0.2c-0.4,0-0.9-0.1-1.3-0.1l0,0.2c-0.4,0-0.9-0.1-1.3-0.1l0-0.2
	c-0.4,0-0.8-0.1-1.3-0.2l0,0.2c-0.4-0.1-0.8-0.1-1.3-0.2l0-0.2c-0.4-0.1-0.8-0.1-1.3-0.2l0,0.2c-0.4-0.1-0.8-0.2-1.3-0.2l0-0.2
	c-0.4-0.1-0.8-0.2-1.3-0.3l0,0.2c-0.4-0.1-0.8-0.2-1.3-0.3l0-0.2c-0.4-0.1-0.8-0.2-1.2-0.3l0,0.2c-0.4-0.1-0.8-0.2-1.2-0.3l0-0.2
	c-0.4-0.1-0.8-0.2-1.2-0.4l0,0.2c-0.4-0.1-0.8-0.3-1.2-0.4l0.1-0.2c-0.4-0.1-0.8-0.3-1.2-0.4l-0.1,0.2c-0.4-0.1-0.8-0.3-1.2-0.4
	l0.1-0.2c-0.4-0.2-0.8-0.3-1.2-0.5l-0.1,0.2c-0.4-0.2-0.8-0.3-1.2-0.5l0.1-0.1c-0.4-0.2-0.8-0.3-1.2-0.5l-0.1,0.1
	c-0.4-0.2-0.8-0.4-1.2-0.5l0.1-0.1c-0.4-0.2-0.8-0.4-1.2-0.6l-0.1,0.1c-0.4-0.2-0.8-0.4-1.1-0.6l0.1-0.1c-0.4-0.2-0.8-0.4-1.1-0.6
	l-0.1,0.1c-0.4-0.2-0.7-0.4-1.1-0.6l0.1-0.1c-0.4-0.2-0.7-0.4-1.1-0.7l-0.1,0.1c-0.4-0.2-0.7-0.5-1.1-0.7l0.1-0.1
	c-0.4-0.2-0.7-0.5-1.1-0.7l-0.1,0.1c-0.4-0.2-0.7-0.5-1.1-0.7l0.1-0.1c-0.3-0.2-0.7-0.5-1-0.7l-0.1,0.1c-0.3-0.3-0.7-0.5-1-0.8
	l0.1-0.1c-0.3-0.3-0.7-0.5-1-0.8l-0.1,0.1c-0.3-0.3-0.7-0.5-1-0.8l0.1-0.1c-0.3-0.3-0.7-0.6-1-0.8l-0.1,0.1c-0.3-0.3-0.6-0.6-1-0.9
	l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1c-0.3-0.3-0.6-0.6-0.9-0.9l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1
	c-0.3-0.3-0.6-0.6-0.9-0.9l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1c-0.3-0.3-0.6-0.6-0.8-1l0.1-0.1c-0.3-0.3-0.6-0.7-0.8-1
	l-0.1,0.1c-0.3-0.3-0.5-0.7-0.8-1l0.1-0.1c-0.3-0.3-0.5-0.7-0.8-1l-0.1,0.1c-0.3-0.3-0.5-0.7-0.8-1l0.1-0.1c-0.3-0.3-0.5-0.7-0.7-1
	l-0.1,0.1c-0.2-0.4-0.5-0.7-0.7-1.1l0.1-0.1c-0.2-0.4-0.5-0.7-0.7-1.1l-0.1,0.1c-0.2-0.4-0.5-0.7-0.7-1.1l0.1-0.1
	c-0.2-0.4-0.4-0.7-0.7-1.1l-0.1,0.1c-0.2-0.4-0.4-0.7-0.6-1.1l0.1-0.1c-0.2-0.4-0.4-0.7-0.6-1.1l-0.1,0.1c-0.2-0.4-0.4-0.8-0.6-1.1
	l0.1-0.1c-0.2-0.4-0.4-0.8-0.6-1.2l-0.1,0.1c-0.2-0.4-0.4-0.8-0.5-1.2l0.1-0.1c-0.2-0.4-0.3-0.8-0.5-1.2l-0.1,0.1
	c-0.2-0.4-0.3-0.8-0.5-1.2l0.2-0.1c-0.2-0.4-0.3-0.8-0.5-1.2l-0.2,0.1c-0.2-0.4-0.3-0.8-0.4-1.2l0.2-0.1c-0.1-0.4-0.3-0.8-0.4-1.2
	l-0.2,0.1c-0.1-0.4-0.3-0.8-0.4-1.2l0.2,0c-0.1-0.4-0.2-0.8-0.4-1.2l-0.2,0c-0.1-0.4-0.2-0.8-0.3-1.2l0.2,0
	c-0.1-0.4-0.2-0.8-0.3-1.2l-0.2,0C10,84.4,9.9,84,9.8,83.5l0.2,0c-0.1-0.4-0.2-0.8-0.3-1.3l-0.2,0c-0.1-0.4-0.2-0.8-0.2-1.3l0.2,0
	c-0.1-0.4-0.1-0.8-0.2-1.3l-0.2,0C9,79.3,9,78.9,8.9,78.5l0.2,0C9,78,9,77.6,8.9,77.2l-0.2,0c0-0.4-0.1-0.9-0.1-1.3l0.2,0
	c0-0.4-0.1-0.8-0.1-1.3l-0.2,0c0-0.4-0.1-0.9-0.1-1.3l0.2,0c0-0.4,0-0.8-0.1-1.3l-0.2,0c0-0.4,0-0.9,0-1.3l0.2,0c0-0.2,0-0.4,0-0.6
	c0-0.2,0-0.4,0-0.6l-0.2,0c0-0.4,0-0.9,0-1.3l0.2,0c0-0.4,0-0.9,0.1-1.3l-0.2,0c0-0.4,0-0.9,0.1-1.3l0.2,0c0-0.4,0.1-0.9,0.1-1.3
	l-0.2,0c0-0.4,0.1-0.9,0.1-1.3l0.2,0c0-0.4,0.1-0.8,0.2-1.3l-0.2,0C9,61.4,9,61,9.1,60.6l0.2,0c0.1-0.4,0.1-0.8,0.2-1.3l-0.2,0
	c0.1-0.4,0.2-0.8,0.2-1.3l0.2,0c0.1-0.4,0.2-0.8,0.3-1.3l-0.2,0c0.1-0.4,0.2-0.8,0.3-1.3l0.2,0c0.1-0.4,0.2-0.8,0.3-1.2l-0.2,0
	c0.1-0.4,0.2-0.8,0.3-1.2l0.2,0c0.1-0.4,0.2-0.8,0.4-1.2l-0.2,0c0.1-0.4,0.3-0.8,0.4-1.2l0.2,0.1c0.1-0.4,0.3-0.8,0.4-1.2l-0.2-0.1
	c0.1-0.4,0.3-0.8,0.4-1.2l0.2,0.1c0.2-0.4,0.3-0.8,0.5-1.2L12.8,47c0.2-0.4,0.3-0.8,0.5-1.2l0.1,0.1c0.2-0.4,0.3-0.8,0.5-1.2
	l-0.1-0.1c0.2-0.4,0.4-0.8,0.5-1.2l0.1,0.1c0.2-0.4,0.4-0.8,0.6-1.2l-0.1-0.1c0.2-0.4,0.4-0.8,0.6-1.1l0.1,0.1
	c0.2-0.4,0.4-0.8,0.6-1.1L16.1,40c0.2-0.4,0.4-0.7,0.6-1.1l0.1,0.1c0.2-0.4,0.4-0.7,0.7-1.1l-0.1-0.1c0.2-0.4,0.4-0.7,0.7-1.1
	l0.1,0.1c0.2-0.4,0.5-0.7,0.7-1.1l-0.1-0.1c0.2-0.4,0.5-0.7,0.7-1.1l0.1,0.1c0.2-0.4,0.5-0.7,0.7-1l-0.1-0.1c0.3-0.3,0.5-0.7,0.8-1
	l0.1,0.1c0.3-0.3,0.5-0.7,0.8-1l-0.1-0.1c0.3-0.3,0.5-0.7,0.8-1l0.1,0.1c0.3-0.3,0.5-0.7,0.8-1l-0.1-0.1c0.3-0.3,0.6-0.6,0.8-1
	l0.1,0.1c0.3-0.3,0.6-0.6,0.9-0.9l-0.1-0.1c0.3-0.3,0.6-0.6,0.9-0.9l0.1,0.1c0.3-0.3,0.6-0.6,0.9-0.9L27,25.7
	c0.3-0.3,0.6-0.6,0.9-0.9l0.1,0.1c0.3-0.3,0.6-0.6,0.9-0.9l-0.1-0.1c0.3-0.3,0.6-0.6,1-0.9l0.1,0.1c0.3-0.3,0.6-0.6,1-0.8l-0.1-0.1
	c0.3-0.3,0.7-0.5,1-0.8l0.1,0.1c0.3-0.3,0.7-0.5,1-0.8l-0.1-0.1c0.3-0.3,0.7-0.5,1-0.8l0.1,0.1c0.3-0.3,0.7-0.5,1-0.7l-0.1-0.1
	c0.4-0.2,0.7-0.5,1.1-0.7l0.1,0.1c0.4-0.2,0.7-0.5,1.1-0.7L37,17.7c0.4-0.2,0.7-0.5,1.1-0.7l0.1,0.1c0.4-0.2,0.7-0.4,1.1-0.7
	l-0.1-0.1c0.4-0.2,0.7-0.4,1.1-0.6l0.1,0.1c0.4-0.2,0.7-0.4,1.1-0.6l-0.1-0.1c0.4-0.2,0.8-0.4,1.1-0.6l0.1,0.1
	c0.4-0.2,0.8-0.4,1.2-0.6l-0.1-0.1c0.4-0.2,0.8-0.4,1.2-0.5l0.1,0.1c0.4-0.2,0.8-0.3,1.2-0.5L46,12.9c0.4-0.2,0.8-0.3,1.2-0.5
	l0.1,0.2c0.4-0.2,0.8-0.3,1.2-0.5l-0.1-0.2c0.4-0.2,0.8-0.3,1.2-0.4l0.1,0.2c0.4-0.1,0.8-0.3,1.2-0.4L50.8,11
	c0.4-0.1,0.8-0.3,1.2-0.4l0,0.2c0.4-0.1,0.8-0.2,1.2-0.4l0-0.2c0.4-0.1,0.8-0.2,1.2-0.3l0,0.2c0.4-0.1,0.8-0.2,1.2-0.3l0-0.2
	c0.4-0.1,0.8-0.2,1.3-0.3l0,0.2c0.4-0.1,0.8-0.2,1.3-0.3l0-0.2c0.4-0.1,0.8-0.2,1.3-0.2l0,0.2c0.4-0.1,0.8-0.1,1.3-0.2l0-0.2
	c0.4-0.1,0.8-0.1,1.3-0.2l0,0.2c0.4-0.1,0.8-0.1,1.3-0.2l0-0.2c0.4,0,0.9-0.1,1.3-0.1l0,0.2c0.4,0,0.8-0.1,1.3-0.1l0-0.2
	C66.3,8,66.8,8,67.2,8l0,0.2c0.4,0,0.8,0,1.3-0.1l0-0.2c0.4,0,0.9,0,1.3,0l0,0.2c0.2,0,0.4,0,0.6,0c0.2,0,0.4,0,0.6,0l0-0.2
	c0.4,0,0.9,0,1.3,0l0,0.2c0.4,0,0.9,0,1.3,0.1l0-0.2C74,8,74.5,8,74.9,8l0,0.2c0.4,0,0.9,0.1,1.3,0.1l0-0.2c0.4,0,0.9,0.1,1.3,0.1
	l0,0.2c0.4,0,0.8,0.1,1.3,0.2l0-0.2c0.4,0.1,0.8,0.1,1.3,0.2l0,0.2c0.4,0.1,0.8,0.1,1.3,0.2l0-0.2c0.4,0.1,0.8,0.2,1.3,0.2l0,0.2
	c0.4,0.1,0.8,0.2,1.3,0.3l0-0.2c0.4,0.1,0.8,0.2,1.3,0.3l0,0.2c0.4,0.1,0.8,0.2,1.2,0.3l0-0.2c0.4,0.1,0.8,0.2,1.2,0.3l0,0.2
	c0.4,0.1,0.8,0.2,1.2,0.4l0-0.2c0.4,0.1,0.8,0.3,1.2,0.4l-0.1,0.2c0.4,0.1,0.8,0.3,1.2,0.4l0.1-0.2c0.4,0.1,0.8,0.3,1.2,0.4
	l-0.1,0.2c0.4,0.2,0.8,0.3,1.2,0.5l0.1-0.2c0.4,0.2,0.8,0.3,1.2,0.5L94.7,13c0.4,0.2,0.8,0.3,1.2,0.5l0.1-0.1
	c0.4,0.2,0.8,0.4,1.2,0.5L97,14.1c0.4,0.2,0.8,0.4,1.2,0.6l0.1-0.1c0.4,0.2,0.8,0.4,1.1,0.6l-0.1,0.1c0.4,0.2,0.8,0.4,1.1,0.6
	l0.1-0.1c0.4,0.2,0.7,0.4,1.1,0.6l-0.1,0.1c0.4,0.2,0.7,0.4,1.1,0.7l0.1-0.1c0.4,0.2,0.7,0.5,1.1,0.7l-0.1,0.1
	c0.4,0.2,0.7,0.5,1.1,0.7l0.1-0.1c0.4,0.2,0.7,0.5,1.1,0.7l-0.1,0.1c0.3,0.2,0.7,0.5,1,0.7l0.1-0.1c0.3,0.3,0.7,0.5,1,0.8l-0.1,0.1
	c0.3,0.3,0.7,0.5,1,0.8l0.1-0.1c0.3,0.3,0.7,0.5,1,0.8l-0.1,0.1c0.3,0.3,0.7,0.6,1,0.8l0.1-0.1c0.3,0.3,0.6,0.6,1,0.9l-0.1,0.1
	c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1c0.3,0.3,0.6,0.6,0.9,0.9l-0.1,0.1c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1c0.3,0.3,0.6,0.6,0.9,0.9
	l-0.1,0.1c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1c0.3,0.3,0.6,0.6,0.8,1l-0.1,0.1c0.3,0.3,0.6,0.7,0.8,1l0.1-0.1c0.3,0.3,0.5,0.7,0.8,1
	l-0.1,0.1c0.3,0.3,0.5,0.7,0.8,1l0.1-0.1c0.3,0.3,0.5,0.7,0.8,1l-0.1,0.1c0.3,0.3,0.5,0.7,0.7,1l0.1-0.1c0.2,0.4,0.5,0.7,0.7,1.1
	l-0.1,0.1c0.2,0.4,0.5,0.7,0.7,1.1l0.1-0.1c0.2,0.4,0.5,0.7,0.7,1.1l-0.1,0.1c0.2,0.4,0.4,0.7,0.7,1.1l0.1-0.1
	c0.2,0.4,0.4,0.7,0.6,1.1l-0.1,0.1c0.2,0.4,0.4,0.7,0.6,1.1l0.1-0.1c0.2,0.4,0.4,0.8,0.6,1.1l-0.1,0.1c0.2,0.4,0.4,0.8,0.6,1.2
	l0.1-0.1c0.2,0.4,0.4,0.8,0.5,1.2l-0.1,0.1c0.2,0.4,0.3,0.8,0.5,1.2l0.1-0.1c0.2,0.4,0.3,0.8,0.5,1.2l-0.2,0.1
	c0.2,0.4,0.3,0.8,0.5,1.2l0.2-0.1c0.2,0.4,0.3,0.8,0.4,1.2l-0.2,0.1c0.1,0.4,0.3,0.8,0.4,1.2l0.2-0.1c0.1,0.4,0.3,0.8,0.4,1.2
	l-0.2,0c0.1,0.4,0.2,0.8,0.4,1.2l0.2,0c0.1,0.4,0.2,0.8,0.3,1.2l-0.2,0c0.1,0.4,0.2,0.8,0.3,1.2l0.2,0c0.1,0.4,0.2,0.8,0.3,1.3
	l-0.2,0c0.1,0.4,0.2,0.8,0.3,1.3l0.2,0c0.1,0.4,0.2,0.8,0.2,1.3l-0.2,0c0.1,0.4,0.1,0.8,0.2,1.3l0.2,0c0.1,0.4,0.1,0.8,0.2,1.3
	l-0.2,0c0.1,0.4,0.1,0.8,0.2,1.3l0.2,0c0,0.4,0.1,0.9,0.1,1.3l-0.2,0c0,0.4,0.1,0.8,0.1,1.3l0.2,0c0,0.4,0.1,0.9,0.1,1.3l-0.2,0
	c0,0.4,0,0.8,0.1,1.3l0.2,0c0,0.4,0,0.9,0,1.3l-0.2,0c0,0.2,0,0.4,0,0.6c0,0.2,0,0.4,0,0.6l0.2,0c0,0.4,0,0.9,0,1.3l-0.2,0
	c0,0.4,0,0.9-0.1,1.3l0.2,0c0,0.4,0,0.9-0.1,1.3l-0.2,0c0,0.4-0.1,0.9-0.1,1.3l0.2,0c0,0.4-0.1,0.9-0.1,1.3l-0.2,0
	c0,0.4-0.1,0.8-0.2,1.3l0.2,0c-0.1,0.4-0.1,0.8-0.2,1.3l-0.2,0c-0.1,0.4-0.1,0.8-0.2,1.3l0.2,0c-0.1,0.4-0.2,0.8-0.2,1.3l-0.2,0
	c-0.1,0.4-0.2,0.8-0.3,1.3l0.2,0c-0.1,0.4-0.2,0.8-0.3,1.3l-0.2,0c-0.1,0.4-0.2,0.8-0.3,1.2l0.2,0c-0.1,0.4-0.2,0.8-0.3,1.2l-0.2,0
	c-0.1,0.4-0.2,0.8-0.4,1.2l0.2,0c-0.1,0.4-0.3,0.8-0.4,1.2l-0.2-0.1c-0.1,0.4-0.3,0.8-0.4,1.2l0.2,0.1c-0.1,0.4-0.3,0.8-0.4,1.2
	l-0.2-0.1c-0.2,0.4-0.3,0.8-0.5,1.2l0.2,0.1c-0.2,0.4-0.3,0.8-0.5,1.2l-0.1-0.1c-0.2,0.4-0.3,0.8-0.5,1.2l0.1,0.1
	c-0.2,0.4-0.4,0.8-0.5,1.2l-0.1-0.1c-0.2,0.4-0.4,0.8-0.6,1.2l0.1,0.1c-0.2,0.4-0.4,0.8-0.6,1.1l-0.1-0.1c-0.2,0.4-0.4,0.8-0.6,1.1
	l0.1,0.1c-0.2,0.4-0.4,0.7-0.6,1.1l-0.1-0.1c-0.2,0.4-0.4,0.7-0.7,1.1l0.1,0.1c-0.2,0.4-0.4,0.7-0.7,1.1l-0.1-0.1
	c-0.2,0.4-0.5,0.7-0.7,1.1l0.1,0.1c-0.2,0.4-0.5,0.7-0.7,1.1l-0.1-0.1c-0.2,0.4-0.5,0.7-0.7,1l0.1,0.1c-0.3,0.3-0.5,0.7-0.8,1
	l-0.1-0.1c-0.3,0.3-0.5,0.7-0.8,1l0.1,0.1c-0.3,0.3-0.5,0.7-0.8,1l-0.1-0.1c-0.3,0.3-0.5,0.7-0.8,1l0.1,0.1c-0.3,0.3-0.6,0.6-0.8,1
	l-0.1-0.1c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1c-0.3,0.3-0.6,0.6-0.9,0.9l-0.1-0.1c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1
	c-0.3,0.3-0.6,0.6-0.9,0.9l-0.1-0.1c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1c-0.3,0.3-0.6,0.6-1,0.9l-0.1-0.1c-0.3,0.3-0.6,0.6-1,0.8
	l0.1,0.1c-0.3,0.3-0.7,0.5-1,0.8l-0.1-0.1c-0.3,0.3-0.7,0.5-1,0.8l0.1,0.1c-0.3,0.3-0.7,0.5-1,0.8l-0.1-0.1c-0.3,0.3-0.7,0.5-1,0.7
	l0.1,0.1c-0.3,0.2-0.7,0.5-1.1,0.7l-0.1-0.1c-0.4,0.2-0.7,0.5-1.1,0.7l0.1,0.1c-0.4,0.2-0.7,0.5-1.1,0.7l-0.1-0.1
	c-0.4,0.2-0.7,0.4-1.1,0.7l0.1,0.1c-0.4,0.2-0.7,0.4-1.1,0.6l-0.1-0.1c-0.4,0.2-0.7,0.4-1.1,0.6l0.1,0.1c-0.4,0.2-0.8,0.4-1.1,0.6
	l-0.1-0.1c-0.4,0.2-0.8,0.4-1.2,0.6l0.1,0.1c-0.4,0.2-0.8,0.4-1.2,0.5l-0.1-0.1c-0.4,0.2-0.8,0.3-1.2,0.5l0.1,0.1
	c-0.4,0.2-0.8,0.3-1.2,0.5l-0.1-0.2c-0.4,0.2-0.8,0.3-1.2,0.5l0.1,0.2c-0.4,0.2-0.8,0.3-1.2,0.4l-0.1-0.2c-0.4,0.1-0.8,0.3-1.2,0.4
	l0.1,0.2c-0.4,0.1-0.8,0.3-1.2,0.4l0-0.2c-0.4,0.1-0.8,0.2-1.2,0.4l0,0.2c-0.4,0.1-0.8,0.2-1.2,0.3l0-0.2c-0.4,0.1-0.8,0.2-1.2,0.3
	l0,0.2c-0.4,0.1-0.8,0.2-1.3,0.3l0-0.2c-0.4,0.1-0.8,0.2-1.3,0.3l0,0.2c-0.4,0.1-0.8,0.2-1.3,0.2l0-0.2c-0.4,0.1-0.8,0.1-1.3,0.2
	l0,0.2c-0.4,0.1-0.8,0.1-1.3,0.2l0-0.2c-0.4,0.1-0.8,0.1-1.3,0.2l0,0.2c-0.4,0-0.9,0.1-1.3,0.1l0-0.2c-0.4,0-0.8,0.1-1.3,0.1l0,0.2
	c-0.4,0-0.9,0.1-1.3,0.1l0-0.2c-0.4,0-0.8,0-1.3,0.1L72.3,132.4z'
      />
      <circle fill='none' strokeWidth='0.3239' cx='70.6' cy='70.2' r='60.1' />
      <path
        fill='none'
        strokeWidth='0.3239'
        d='M70.2,131.3c-34,0-61.6-27.3-61.6-60.9c0-33.6,27.6-60.9,61.6-60.9c34,0,61.6,27.3,61.6,60.9
	C131.8,104,104.2,131.3,70.2,131.3z'
      />
      <path
        fill='none'
        strokeWidth='0.3239'
        strokeDasharray='1.3 1.3'
        d='M72.3,129.5c-0.4,0-0.9,0-1.3,0l0-0.2c-0.2,0-0.4,0-0.6,0c-0.2,0-0.4,0-0.6,0l0,0.2c-0.4,0-0.9,0-1.3,0l0-0.2
	c-0.4,0-0.9,0-1.3-0.1l0,0.2c-0.4,0-0.9-0.1-1.3-0.1l0-0.2c-0.4,0-0.8-0.1-1.3-0.1l0,0.2c-0.4,0-0.9-0.1-1.3-0.1l0-0.2
	c-0.4-0.1-0.8-0.1-1.3-0.2l0,0.2c-0.4-0.1-0.8-0.1-1.3-0.2l0-0.2c-0.4-0.1-0.8-0.1-1.3-0.2l0,0.2c-0.4-0.1-0.8-0.2-1.3-0.3l0-0.2
	c-0.4-0.1-0.8-0.2-1.2-0.3l0,0.2c-0.4-0.1-0.8-0.2-1.2-0.3l0-0.2c-0.4-0.1-0.8-0.2-1.2-0.3l0,0.2c-0.4-0.1-0.8-0.2-1.2-0.4l0-0.2
	c-0.4-0.1-0.8-0.3-1.2-0.4l-0.1,0.2c-0.4-0.1-0.8-0.3-1.2-0.4L51,126c-0.4-0.1-0.8-0.3-1.2-0.4l-0.1,0.2c-0.4-0.2-0.8-0.3-1.2-0.5
	l0.1-0.2c-0.4-0.2-0.8-0.3-1.2-0.5l-0.1,0.1c-0.4-0.2-0.8-0.3-1.2-0.5l0.1-0.1c-0.4-0.2-0.8-0.4-1.2-0.5l-0.1,0.1
	c-0.4-0.2-0.8-0.4-1.1-0.6l0.1-0.1c-0.4-0.2-0.8-0.4-1.1-0.6l-0.1,0.1c-0.4-0.2-0.8-0.4-1.1-0.6l0.1-0.1c-0.4-0.2-0.7-0.4-1.1-0.6
	l-0.1,0.1c-0.4-0.2-0.7-0.4-1.1-0.7l0.1-0.1c-0.4-0.2-0.7-0.5-1.1-0.7l-0.1,0.1c-0.4-0.2-0.7-0.5-1.1-0.7l0.1-0.1
	c-0.4-0.2-0.7-0.5-1-0.7l-0.1,0.1c-0.3-0.3-0.7-0.5-1-0.8l0.1-0.1c-0.3-0.3-0.7-0.5-1-0.8l-0.1,0.1c-0.3-0.3-0.7-0.5-1-0.8l0.1-0.1
	c-0.3-0.3-0.7-0.5-1-0.8l-0.1,0.1c-0.3-0.3-0.6-0.6-1-0.8l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1c-0.3-0.3-0.6-0.6-0.9-0.9
	l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1c-0.3-0.3-0.6-0.6-0.9-0.9l0.1-0.1c-0.3-0.3-0.6-0.6-0.9-0.9l-0.1,0.1
	c-0.3-0.3-0.6-0.6-0.8-1l0.1-0.1c-0.3-0.3-0.5-0.7-0.8-1l-0.1,0.1c-0.3-0.3-0.5-0.7-0.8-1l0.1-0.1c-0.3-0.3-0.5-0.7-0.8-1l-0.1,0.1
	c-0.3-0.3-0.5-0.7-0.8-1l0.1-0.1c-0.2-0.3-0.5-0.7-0.7-1l-0.1,0.1c-0.2-0.4-0.5-0.7-0.7-1.1l0.1-0.1c-0.2-0.4-0.5-0.7-0.7-1.1
	l-0.1,0.1c-0.2-0.4-0.4-0.7-0.7-1.1l0.1-0.1c-0.2-0.4-0.4-0.7-0.6-1.1l-0.1,0.1c-0.2-0.4-0.4-0.7-0.6-1.1l0.1-0.1
	c-0.2-0.4-0.4-0.8-0.6-1.1l-0.1,0.1c-0.2-0.4-0.4-0.8-0.6-1.2l0.1-0.1c-0.2-0.4-0.4-0.8-0.5-1.2L17,94.9c-0.2-0.4-0.3-0.8-0.5-1.2
	l0.1-0.1c-0.2-0.4-0.3-0.8-0.5-1.2L16,92.5c-0.2-0.4-0.3-0.8-0.5-1.2l0.2-0.1c-0.1-0.4-0.3-0.8-0.4-1.2l-0.2,0.1
	c-0.1-0.4-0.3-0.8-0.4-1.2l0.2-0.1c-0.1-0.4-0.3-0.8-0.4-1.2l-0.2,0c-0.1-0.4-0.2-0.8-0.4-1.2l0.2,0c-0.1-0.4-0.2-0.8-0.3-1.2
	l-0.2,0c-0.1-0.4-0.2-0.8-0.3-1.2l0.2,0c-0.1-0.4-0.2-0.8-0.3-1.2l-0.2,0c-0.1-0.4-0.2-0.8-0.2-1.3l0.2,0c-0.1-0.4-0.2-0.8-0.2-1.3
	l-0.2,0c-0.1-0.4-0.1-0.8-0.2-1.3l0.2,0c-0.1-0.4-0.1-0.8-0.2-1.3l-0.2,0c-0.1-0.4-0.1-0.8-0.1-1.3l0.2,0c0-0.4-0.1-0.8-0.1-1.3
	l-0.2,0c0-0.4-0.1-0.9-0.1-1.3l0.2,0c0-0.4,0-0.8-0.1-1.3l-0.2,0c0-0.4,0-0.9,0-1.3l0.2,0c0-0.2,0-0.4,0-0.6c0-0.2,0-0.4,0-0.6
	l-0.2,0c0-0.4,0-0.9,0-1.3l0.2,0c0-0.4,0-0.8,0.1-1.3l-0.2,0c0-0.4,0.1-0.9,0.1-1.3l0.2,0c0-0.4,0.1-0.8,0.1-1.3l-0.2,0
	c0-0.4,0.1-0.9,0.1-1.3l0.2,0c0.1-0.4,0.1-0.8,0.2-1.3l-0.2,0c0.1-0.4,0.1-0.8,0.2-1.3l0.2,0c0.1-0.4,0.1-0.8,0.2-1.3l-0.2,0
	c0.1-0.4,0.2-0.8,0.2-1.3l0.2,0c0.1-0.4,0.2-0.8,0.3-1.2l-0.2,0c0.1-0.4,0.2-0.8,0.3-1.2l0.2,0c0.1-0.4,0.2-0.8,0.3-1.2l-0.2,0
	c0.1-0.4,0.2-0.8,0.4-1.2l0.2,0c0.1-0.4,0.3-0.8,0.4-1.2l-0.2-0.1c0.1-0.4,0.3-0.8,0.4-1.2l0.2,0.1c0.1-0.4,0.3-0.8,0.4-1.2L15.5,50
	c0.1-0.4,0.3-0.8,0.5-1.2l0.2,0.1c0.2-0.4,0.3-0.8,0.5-1.2l-0.1-0.1c0.2-0.4,0.3-0.8,0.5-1.2l0.1,0.1c0.2-0.4,0.4-0.8,0.5-1.2
	l-0.1-0.1c0.2-0.4,0.4-0.8,0.6-1.2l0.1,0.1c0.2-0.4,0.4-0.8,0.6-1.1L18.7,43c0.2-0.4,0.4-0.8,0.6-1.1l0.1,0.1
	c0.2-0.4,0.4-0.7,0.6-1.1L20,40.7c0.2-0.4,0.4-0.7,0.7-1.1l0.1,0.1c0.2-0.4,0.5-0.7,0.7-1.1l-0.1-0.1c0.2-0.4,0.5-0.7,0.7-1.1
	l0.1,0.1c0.2-0.4,0.5-0.7,0.7-1l-0.1-0.1c0.2-0.3,0.5-0.7,0.8-1l0.1,0.1c0.3-0.3,0.5-0.7,0.8-1l-0.1-0.1c0.3-0.3,0.5-0.7,0.8-1
	l0.1,0.1c0.3-0.3,0.5-0.7,0.8-1l-0.1-0.1c0.3-0.3,0.6-0.6,0.8-1l0.1,0.1c0.3-0.3,0.6-0.6,0.9-0.9l-0.1-0.1c0.3-0.3,0.6-0.6,0.9-0.9
	l0.1,0.1c0.3-0.3,0.6-0.6,0.9-0.9l-0.1-0.1c0.3-0.3,0.6-0.6,0.9-0.9l0.1,0.1c0.3-0.3,0.6-0.6,0.9-0.9l-0.1-0.1
	c0.3-0.3,0.6-0.6,1-0.8l0.1,0.1c0.3-0.3,0.6-0.6,1-0.8l-0.1-0.1c0.3-0.3,0.7-0.5,1-0.8l0.1,0.1c0.3-0.3,0.7-0.5,1-0.8l-0.1-0.1
	c0.3-0.3,0.7-0.5,1-0.8l0.1,0.1c0.3-0.2,0.7-0.5,1-0.7l-0.1-0.1c0.4-0.2,0.7-0.5,1.1-0.7l0.1,0.1c0.4-0.2,0.7-0.5,1.1-0.7l-0.1-0.1
	c0.4-0.2,0.7-0.4,1.1-0.7l0.1,0.1c0.4-0.2,0.7-0.4,1.1-0.6l-0.1-0.1c0.4-0.2,0.7-0.4,1.1-0.6l0.1,0.1c0.4-0.2,0.8-0.4,1.1-0.6
	l-0.1-0.1c0.4-0.2,0.8-0.4,1.1-0.6l0.1,0.1c0.4-0.2,0.8-0.4,1.2-0.5l-0.1-0.1c0.4-0.2,0.8-0.4,1.2-0.5l0.1,0.1
	c0.4-0.2,0.8-0.3,1.2-0.5l-0.1-0.2c0.4-0.2,0.8-0.3,1.2-0.5l0.1,0.2c0.4-0.2,0.8-0.3,1.2-0.4l-0.1-0.2c0.4-0.1,0.8-0.3,1.2-0.4
	l0.1,0.2c0.4-0.1,0.8-0.3,1.2-0.4l0-0.2c0.4-0.1,0.8-0.2,1.2-0.4l0,0.2c0.4-0.1,0.8-0.2,1.2-0.3l0-0.2c0.4-0.1,0.8-0.2,1.2-0.3
	l0,0.2c0.4-0.1,0.8-0.2,1.2-0.3l0-0.2c0.4-0.1,0.8-0.2,1.3-0.2l0,0.2c0.4-0.1,0.8-0.2,1.3-0.2l0-0.2c0.4-0.1,0.8-0.1,1.3-0.2l0,0.2
	c0.4-0.1,0.8-0.1,1.3-0.2l0-0.2c0.4-0.1,0.8-0.1,1.3-0.1l0,0.2c0.4,0,0.8-0.1,1.3-0.1l0-0.2c0.4,0,0.9-0.1,1.3-0.1l0,0.2
	c0.4,0,0.8,0,1.3-0.1l0-0.2c0.4,0,0.9,0,1.3,0l0,0.2c0.2,0,0.4,0,0.6,0s0.4,0,0.6,0l0-0.2c0.4,0,0.9,0,1.3,0l0,0.2
	c0.4,0,0.9,0,1.3,0.1l0-0.2c0.4,0,0.9,0.1,1.3,0.1l0,0.2c0.4,0,0.8,0.1,1.3,0.1l0-0.2c0.4,0,0.9,0.1,1.3,0.1l0,0.2
	c0.4,0.1,0.8,0.1,1.3,0.2l0-0.2c0.4,0.1,0.8,0.1,1.3,0.2l0,0.2c0.4,0.1,0.8,0.1,1.3,0.2l0-0.2c0.4,0.1,0.8,0.2,1.3,0.2l0,0.2
	c0.4,0.1,0.8,0.2,1.2,0.3l0-0.2c0.4,0.1,0.8,0.2,1.2,0.3l0,0.2c0.4,0.1,0.8,0.2,1.2,0.3l0-0.2c0.4,0.1,0.8,0.2,1.2,0.4l0,0.2
	c0.4,0.1,0.8,0.3,1.2,0.4l0.1-0.2c0.4,0.1,0.8,0.3,1.2,0.4l-0.1,0.2c0.4,0.1,0.8,0.3,1.2,0.4l0.1-0.2c0.4,0.2,0.8,0.3,1.2,0.5
	l-0.1,0.2c0.4,0.2,0.8,0.3,1.2,0.5l0.1-0.1c0.4,0.2,0.8,0.3,1.2,0.5l-0.1,0.1c0.4,0.2,0.8,0.4,1.2,0.5l0.1-0.1
	c0.4,0.2,0.8,0.4,1.1,0.6l-0.1,0.1c0.4,0.2,0.8,0.4,1.1,0.6l0.1-0.1c0.4,0.2,0.8,0.4,1.1,0.6l-0.1,0.1c0.4,0.2,0.7,0.4,1.1,0.6
	l0.1-0.1c0.4,0.2,0.7,0.4,1.1,0.7l-0.1,0.1c0.4,0.2,0.7,0.5,1.1,0.7l0.1-0.1c0.4,0.2,0.7,0.5,1.1,0.7l-0.1,0.1
	c0.3,0.2,0.7,0.5,1,0.7l0.1-0.1c0.3,0.3,0.7,0.5,1,0.8l-0.1,0.1c0.3,0.3,0.7,0.5,1,0.8l0.1-0.1c0.3,0.3,0.7,0.5,1,0.8l-0.1,0.1
	c0.3,0.3,0.7,0.5,1,0.8l0.1-0.1c0.3,0.3,0.6,0.6,1,0.8l-0.1,0.1c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1c0.3,0.3,0.6,0.6,0.9,0.9l-0.1,0.1
	c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1c0.3,0.3,0.6,0.6,0.9,0.9l-0.1,0.1c0.3,0.3,0.6,0.6,0.9,0.9l0.1-0.1c0.3,0.3,0.6,0.6,0.8,1
	l-0.1,0.1c0.3,0.3,0.5,0.7,0.8,1l0.1-0.1c0.3,0.3,0.5,0.7,0.8,1l-0.1,0.1c0.3,0.3,0.5,0.7,0.8,1l0.1-0.1c0.3,0.3,0.5,0.7,0.8,1
	l-0.1,0.1c0.2,0.3,0.5,0.7,0.7,1l0.1-0.1c0.2,0.4,0.5,0.7,0.7,1.1l-0.1,0.1c0.2,0.4,0.5,0.7,0.7,1.1l0.1-0.1
	c0.2,0.4,0.4,0.7,0.7,1.1l-0.1,0.1c0.2,0.4,0.4,0.7,0.6,1.1l0.1-0.1c0.2,0.4,0.4,0.7,0.6,1.1L122,43c0.2,0.4,0.4,0.8,0.6,1.1
	l0.1-0.1c0.2,0.4,0.4,0.8,0.6,1.2l-0.1,0.1c0.2,0.4,0.4,0.8,0.5,1.2l0.1-0.1c0.2,0.4,0.3,0.8,0.5,1.2l-0.1,0.1
	c0.2,0.4,0.3,0.8,0.5,1.2l0.2-0.1c0.2,0.4,0.3,0.8,0.5,1.2l-0.2,0.1c0.1,0.4,0.3,0.8,0.4,1.2l0.2-0.1c0.1,0.4,0.3,0.8,0.4,1.2
	l-0.2,0.1c0.1,0.4,0.3,0.8,0.4,1.2l0.2,0c0.1,0.4,0.2,0.8,0.4,1.2l-0.2,0c0.1,0.4,0.2,0.8,0.3,1.2l0.2,0c0.1,0.4,0.2,0.8,0.3,1.2
	l-0.2,0c0.1,0.4,0.2,0.8,0.3,1.2l0.2,0c0.1,0.4,0.2,0.8,0.2,1.3l-0.2,0c0.1,0.4,0.1,0.8,0.2,1.3l0.2,0c0.1,0.4,0.1,0.8,0.2,1.3
	l-0.2,0c0.1,0.4,0.1,0.8,0.2,1.3l0.2,0c0.1,0.4,0.1,0.8,0.1,1.3l-0.2,0c0,0.4,0.1,0.8,0.1,1.3l0.2,0c0,0.4,0.1,0.9,0.1,1.3l-0.2,0
	c0,0.4,0,0.8,0.1,1.3l0.2,0c0,0.4,0,0.9,0,1.3l-0.2,0c0,0.2,0,0.4,0,0.6c0,0.2,0,0.4,0,0.6l0.2,0c0,0.4,0,0.9,0,1.3l-0.2,0
	c0,0.4,0,0.9-0.1,1.3l0.2,0c0,0.4-0.1,0.9-0.1,1.3l-0.2,0c0,0.4-0.1,0.8-0.1,1.3l0.2,0c0,0.4-0.1,0.9-0.1,1.3l-0.2,0
	c-0.1,0.4-0.1,0.8-0.2,1.3l0.2,0c-0.1,0.4-0.1,0.8-0.2,1.3l-0.2,0c-0.1,0.4-0.1,0.8-0.2,1.3l0.2,0c-0.1,0.4-0.2,0.8-0.2,1.3l-0.2,0
	c-0.1,0.4-0.2,0.8-0.3,1.2l0.2,0c-0.1,0.4-0.2,0.8-0.3,1.2l-0.2,0c-0.1,0.4-0.2,0.8-0.3,1.2l0.2,0c-0.1,0.4-0.2,0.8-0.4,1.2l-0.2,0
	c-0.1,0.4-0.3,0.8-0.4,1.2l0.2,0.1c-0.1,0.4-0.3,0.8-0.4,1.2l-0.2-0.1c-0.1,0.4-0.3,0.8-0.4,1.2l0.2,0.1c-0.2,0.4-0.3,0.8-0.5,1.2
	l-0.2-0.1c-0.2,0.4-0.3,0.8-0.5,1.2l0.1,0.1c-0.2,0.4-0.3,0.8-0.5,1.2l-0.1-0.1c-0.2,0.4-0.4,0.8-0.5,1.2l0.1,0.1
	c-0.2,0.4-0.4,0.8-0.6,1.2l-0.1-0.1c-0.2,0.4-0.4,0.8-0.6,1.1l0.1,0.1c-0.2,0.4-0.4,0.8-0.6,1.1l-0.1-0.1c-0.2,0.4-0.4,0.7-0.6,1.1
	l0.1,0.1c-0.2,0.4-0.4,0.7-0.7,1.1l-0.1-0.1c-0.2,0.4-0.5,0.7-0.7,1.1l0.1,0.1c-0.2,0.4-0.5,0.7-0.7,1.1l-0.1-0.1
	c-0.2,0.4-0.5,0.7-0.7,1l0.1,0.1c-0.2,0.3-0.5,0.7-0.8,1l-0.1-0.1c-0.3,0.3-0.5,0.7-0.8,1l0.1,0.1c-0.3,0.3-0.5,0.7-0.8,1l-0.1-0.1
	c-0.3,0.3-0.5,0.7-0.8,1l0.1,0.1c-0.3,0.3-0.6,0.6-0.8,1l-0.1-0.1c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1c-0.3,0.3-0.6,0.6-0.9,0.9
	l-0.1-0.1c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1c-0.3,0.3-0.6,0.6-0.9,0.9l-0.1-0.1c-0.3,0.3-0.6,0.6-0.9,0.9l0.1,0.1
	c-0.3,0.3-0.6,0.6-1,0.8l-0.1-0.1c-0.3,0.3-0.6,0.6-1,0.8l0.1,0.1c-0.3,0.3-0.7,0.5-1,0.8l-0.1-0.1c-0.3,0.3-0.7,0.5-1,0.8l0.1,0.1
	c-0.3,0.3-0.7,0.5-1,0.8l-0.1-0.1c-0.3,0.2-0.7,0.5-1,0.7l0.1,0.1c-0.4,0.2-0.7,0.5-1.1,0.7l-0.1-0.1c-0.4,0.2-0.7,0.5-1.1,0.7
	l0.1,0.1c-0.4,0.2-0.7,0.5-1.1,0.7l-0.1-0.1c-0.4,0.2-0.7,0.4-1.1,0.6l0.1,0.1c-0.4,0.2-0.7,0.4-1.1,0.6l-0.1-0.1
	c-0.4,0.2-0.8,0.4-1.1,0.6l0.1,0.1c-0.4,0.2-0.8,0.4-1.1,0.6l-0.1-0.1c-0.4,0.2-0.8,0.4-1.2,0.5l0.1,0.1c-0.4,0.2-0.8,0.3-1.2,0.5
	l-0.1-0.1c-0.4,0.2-0.8,0.3-1.2,0.5l0.1,0.2c-0.4,0.2-0.8,0.3-1.2,0.5l-0.1-0.2c-0.4,0.2-0.8,0.3-1.2,0.4l0.1,0.2
	c-0.4,0.1-0.8,0.3-1.2,0.4l-0.1-0.2c-0.4,0.1-0.8,0.3-1.2,0.4l0,0.2c-0.4,0.1-0.8,0.2-1.2,0.4l0-0.2c-0.4,0.1-0.8,0.2-1.2,0.3l0,0.2
	c-0.4,0.1-0.8,0.2-1.2,0.3l0-0.2c-0.4,0.1-0.8,0.2-1.2,0.3l0,0.2c-0.4,0.1-0.8,0.2-1.3,0.3l0-0.2c-0.4,0.1-0.8,0.2-1.3,0.2l0,0.2
	c-0.4,0.1-0.8,0.1-1.3,0.2l0-0.2c-0.4,0.1-0.8,0.1-1.3,0.2l0,0.2c-0.4,0.1-0.8,0.1-1.3,0.1l0-0.2c-0.4,0-0.8,0.1-1.3,0.1l0,0.2
	c-0.4,0-0.9,0.1-1.3,0.1l0-0.2c-0.4,0-0.8,0-1.3,0.1L72.3,129.5z'
      />
      <circle
        className='svg-ring2'
        fill='none'
        stroke='#fff'
        strokeWidth='6.4781'
        strokeDasharray='1.3 1.3'
        cx='70.4'
        cy='69.9'
        r='50.4'
      />
      <circle
        className='svg-ring3'
        fill='none'
        strokeWidth='0.8239'
        cx='70.6'
        cy='70.2'
        r='52.1'
      />
    </SvgColor>
  );
};

export const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(359deg)
    }
`;

const BottonStyled = styled.button<{
  active1?: boolean;
  active2?: boolean;
  active3?: boolean;
  width: string;
  height: string;
}>`
  background: none;
  outline: none;
  border: none;
  display: block;
  position: relative;
  padding: 0;
  margin: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  .animation-ring {
    animation: ${rotate} 50s linear infinite;
  }
  .svg-ring1,
  .svg-ring2 {
    transition: all 0.3s;
    stroke-dasharray: 1.3 1.3;
  }
  &:hover {
    .svg-ring1 {
      stroke-dasharray: 1.3 0;
      stroke-width: 0.8;
    }
  }
  ${({ active1 }) =>
    active1
      ? `
		.svg-ring1{
			stroke-dasharray: 1.3 0;
			stroke-width: 0.8;
		}
	`
      : ''}
  &:active {
    .svg-ring1 {
      stroke-width: 0.3239;
      stroke-dasharray: 1.3 1.3;
    }
    .svg-ring2 {
      stroke-dasharray: 1.3 0;
    }
  }
  ${({ active1 }) =>
    active1
      ? `
		.svg-ring1{
			stroke-width: 0.3239;
			stroke-dasharray: 1.3 1.3;
		}
		.svg-ring2{
			stroke-dasharray: 1.3 0;
		}
	`
      : ''}
  ${({ active3 }) =>
    active3
      ? `
		.svg-ring3{
			stroke: #4168ED;
			r: 56;
			stroke-width: 2px;
		}
	`
      : ''}
`;

const BottonInner = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
const BgBox = styled(Flex)<{ bgColor?: string }>`
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ bgColor }) => (bgColor ? bgColor : 'none')};
  width: 68%;
  height: 68%;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  img {
    width: 50%;
  }
`;

interface IconAnimation extends SvgProps {
  active1?: boolean; // 边框是实线
  active2?: boolean; // 内边框实线
  active3?: boolean; // 内圈蓝色边
  width?: string; // 内边框实线
  height?: string; // 内边框实线
  isRotate?: boolean;
  bgColor?: string;
  showImg?: boolean;
  color?: string; // 内边框实线
}

const IconAnimation: React.FC<IconAnimation> = ({
  color = 'white',
  children,
  isRotate,
  active1,
  active2,
  active3,
  bgColor,
  showImg,
  width,
  height,
  ...props
}) => {
  return (
    <BottonStyled
      height={height}
      width={width}
      active1={active1}
      active2={active2}
      active3={active3}
    >
      <Icon
        color={color}
        className={isRotate && 'animation-ring'}
        width={width}
        height={height}
        {...props}
      />
      <BottonInner>{children}</BottonInner>
      {bgColor && (
        <BgBox bgColor={bgColor}>
          {showImg && (
            <img
              src={require('assets/images/myWallet/question.png').default}
              alt=''
            />
          )}
        </BgBox>
      )}
    </BottonStyled>
  );
};

export default IconAnimation;
