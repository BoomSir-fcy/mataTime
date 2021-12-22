import React from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import { Box, Flex, Text, Spinner } from 'uikit';
import useMenuNav from 'hooks/useMenuNav';

const TipsFlex = styled(Box)`
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const Time = styled.img`
  max-width: 19px;
  max-height: 21px;
  display: inline-block;
  margin-right: 8px;
`;

const HeaderTips = ({ t }) => {
  return (
    <Flex alignItems='center'>
      <Time src={require('assets/images/myWallet/time.png').default} alt='' />
      <Text small color='textTips'>
        {t(
          'Note that all tasks are refreshed at 0:00 UTC. Please get your $Matter before 0:00 UTC!'
        )}
      </Text>
    </Flex>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const { isMobile } = useMenuNav();
  return (
    <>
      <Crumbs title={t('EasyTaskEarn$Matter')}>
        {!isMobile && <HeaderTips t={t} />}
      </Crumbs>
      {isMobile && (
        <TipsFlex>
          <HeaderTips t={t} />
        </TipsFlex>
      )}
    </>
  );
};

export default Header;
