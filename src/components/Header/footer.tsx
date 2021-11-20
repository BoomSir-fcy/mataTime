import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import { Flex, Box, Text } from 'uikit';
import { Logo } from './logo';

import { mediaQueries, mediaQueriesSize } from 'uikit/theme/base';

const FooterWarpper = styled(Flex)`
  width: 100%;
  height: 125px;
  margin-top: 67px;
  background: ${({ theme }) => theme.colors.gradients.footer};
  padding: 21px 0 29px;
  ${mediaQueries.xxl} {
    padding-left: 160px;
    padding-right: 160px;
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
  ${mediaQueriesSize.marginr};
  text-decoration: ${({ to }) => to && 'underline'};
`;

export const Footer = React.memo(() => {
  const { t } = useTranslation();

  return (
    <FooterWarpper flexDirection="column">
      <LogoWrapper>
        <Logo url="/" src={require('./images/logo.svg').default} />
      </LogoWrapper>
      <Flex>
        <SubText as={Link} to="/">
          {t('loginTeamText')}
        </SubText>
        <SubText as={Link} to="/">
          {t('loginPrivacyPolicyText')}
        </SubText>
        <SubText>© Copyright 2021 Metatime. All Rights Reserved.</SubText>
      </Flex>
    </FooterWarpper>
  );
});
