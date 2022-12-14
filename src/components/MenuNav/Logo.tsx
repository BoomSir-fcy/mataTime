import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, BoxProps, Image } from 'uikit';
import { useThemeManager } from 'store/app/hooks';
import logo from 'assets/images/logo.svg';
import lightLogo from 'assets/images/light_logo.svg';
import useMenuNav from 'hooks/useMenuNav';

const LogoWarpper = styled(Box)`
  display: block;
`;
const ImageStyled = styled(Image)`
  margin-left: -23px;
  max-width: 100%;
  max-height: 100%;
`;

export interface LogoProps extends BoxProps {
  noLink?: boolean;
}
const Logo: React.FC<LogoProps> = ({ noLink, ...props }) => {
  const [isDark] = useThemeManager();
  const { setIsPushed } = useMenuNav();

  return (
    <LogoWarpper {...props} width='100%'>
      {noLink ? (
        <ImageStyled
          src={isDark ? logo : lightLogo}
          width={175}
          height={38}
          alt=''
        />
      ) : (
        <Link to={'/'} onClick={() => setIsPushed(pre => (pre ? false : pre))}>
          <ImageStyled
            src={isDark ? logo : lightLogo}
            width={175}
            height={38}
            alt=''
          />
        </Link>
      )}
    </LogoWarpper>
  );
};

export default Logo;
