import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex, Box, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Logo } from './logo';

import { mediaQueriesSize } from 'uikit/theme/base';
import useTheme from 'hooks/useTheme';

const FooterWarpper = styled(Flex)`
  justify-content: center;
  width: 100%;
  height: 125px;
  padding-left: 45px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  background: ${({ theme }) => theme.colors.gradients.footer};
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

const LogoWrapper = styled(Box)`
  width: 220px;
  height: 40px;
  ${mediaQueriesSize.marginbmd};
`;

const SubText = styled(Text)<{
  to?: string;
}>`
  color: ${({ theme }) => theme.colors.textTips};
  margin-right: 15px;
  &::last-child {
    margin-right: 0;
  }
  text-decoration: ${({ to }) => to && 'underline'};
`;

export const Footer = React.memo(() => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <FooterWarpper flexDirection='column'>
      <LogoWrapper>
        <Logo
          url='/'
          src={
            require(isDark
              ? 'assets/images/logo.svg'
              : 'assets/images/light_logo.svg').default
          }
        />
      </LogoWrapper>
      <Flex>
        <SubText as={Link} to='/'>
          {t('loginTeamText')}
        </SubText>
        <SubText as={Link} to='/'>
          {t('loginPrivacyPolicyText')}
        </SubText>
        <SubText>© Copyright 2021 Metatime. All Rights Reserved.</SubText>
      </Flex>
    </FooterWarpper>
  );
});
