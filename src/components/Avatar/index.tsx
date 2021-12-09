import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';

export * from './AvatarCard';

const scales = {
  XL: 'xl',
  LD: 'ld',
  MD: 'md',
  SM: 'sm',
  MM: 'mm',
  XS: 'xs'
} as const;

const scaleVariants = {
  [scales.XL]: {
    width: '160px',
    height: '160px'
  },
  [scales.LD]: {
    width: '100px',
    height: '100px'
  },
  [scales.MD]: {
    width: '50px',
    height: '50px'
  },
  [scales.SM]: {
    width: '40px',
    height: '40px'
  },
  [scales.MM]: {
    width: '24px',
    height: '24px'
  }
};

const Img = styled.img`
  display: block;
  border-radius: 50%;
  object-fit: cover;
  ${variant({
    prop: 'scale',
    variants: scaleVariants
  })}
`;

export const Avatar: React.FC<{
  src?: string;
  scale?: typeof scales[keyof typeof scales];
  [propName: string]: any;
}> = props => {
  let deepProps = Object.assign({}, props);
  if (!deepProps.src) {
    deepProps.src =
      'https://pic1.zhimg.com/50/v2-c81d57456b7886c12affc22a699983ff_720w.jpg?source=1940ef5c';
  }
  return <Img {...deepProps} />;
};

Avatar.defaultProps = {
  scale: scales.LD
};
