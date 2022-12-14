import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { TooltipWraps } from 'components';
import default_avatar from 'assets/images/default_avatar.png';
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
  uid?: number;
  src?: string;
  scale?: typeof scales[keyof typeof scales];
  disableFollow?: boolean;
  callback?: (type?: string) => void;
  [propName: string]: any;
}> = props => {
  let deepProps = Object.assign({}, props);
  if (!deepProps.src) {
    deepProps.src = default_avatar;
  }

  return (
    <React.Fragment>
      {!props.disableFollow ? (
        <TooltipWraps
          trigger={<Img {...deepProps} />}
          uid={props.uid}
          callback={type => {
            props.callback && props.callback(type);
          }}
        >
          <Img {...deepProps} />
        </TooltipWraps>
      ) : (
        <Img {...deepProps} />
      )}
    </React.Fragment>
  );
};

Avatar.defaultProps = {
  scale: scales.LD
};
