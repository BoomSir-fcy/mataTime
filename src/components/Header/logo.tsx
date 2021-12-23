import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from 'uikit';

interface LogoInterface {
  src: string;
  url?: string;
  style?: React.CSSProperties;
}

const LogoWarpper = styled(Box)`
  display: block;
`;

export const Logo: React.FC<LogoInterface> = ({ src, url, style }) => {
  return (
    <LogoWarpper style={style}>
      <Link to={url}>
        <img src={src} alt="" />
      </Link>
    </LogoWarpper>
  );
};
