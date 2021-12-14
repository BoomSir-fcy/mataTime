import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, BoxProps, Image } from 'uikit';
import { useThemeManager } from 'store/app/hooks';
import logo from 'assets/images/logo.svg'
import lightLogo from 'assets/images/light_logo.svg'

const LogoWarpper = styled(Box)`
  display: block;
`;
const ImageStyled = styled(Image)`
  margin-left: -22px;
  max-width: 100%;
  max-height: 100%;
`
const Logo: React.FC<BoxProps> = (props) => {
  const [isDark] = useThemeManager();

  return (
    <LogoWarpper {...props} width="100%" as={Link} to={'/'}>
      <ImageStyled src={isDark ? logo : lightLogo} width={175} height={38} alt="" />
    </LogoWarpper>
  );
};

export default Logo
