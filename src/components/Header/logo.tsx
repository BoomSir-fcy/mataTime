import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from 'uikit';

interface LogoInterface {
  src: string
  url?: String
  style?: React.CSSProperties
}

const LogoWarpper = styled(Box)`
  display: block;
`

export const Logo: React.FC<LogoInterface> = (({ src, url, style }) => {
  return (
    <LogoWarpper as={Link} to={url} style={style}>
      <img src={src} alt="" />
    </LogoWarpper>
  )
})