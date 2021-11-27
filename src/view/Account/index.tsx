import React, { useState } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import { PageSection, Crumbs, Container, Affix } from 'components'
import { Menu } from 'view/Home/left';
import TokenAccount from './components/TokenAccount';
import Liquidity from './components/Liquidity';
import Single from './components/Single';

const LeftCard = styled(Flex)`
  width: 200px;
  height: 100vh;
  overflow: auto;
`;
const CenterCard = styled(Box)`
  flex: 1;
  margin: 0 15px;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const ContainerStyled = styled(Container)`
  /* background: pink; */
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  padding-top: 0 !important;
  padding-bottom: 12px !important;
  height: 60px;
`

const Account: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageSection innerProps={{ paddingTop: '0 !important' }}>
      <Flex justifyContent="space-between" width="100%">
        <LeftCard>
          <Affix offsetTop={100} positionObj={{}}>
            {/* <CommonMenu hideGoBack menu={menuArr} history={history} /> */}
            <Menu />
          </Affix>
        </LeftCard>
        <CenterCard>
          <Crumbs title={t('homeMenuSet')} />
          <TokenAccount />
          <Box>
            <ContainerStyled>
              <Flex height="100%" alignItems="flex-end">
                <Text fontSize="18px" bold>{t('Account Pools')}</Text>
              </Flex>
            </ContainerStyled>
            {/* <Liquidity /> */}
            <Single />
          </Box>
        </CenterCard>
      </Flex>

    </PageSection>
  )
}

export default Account;