import React from 'react';
import { Flex } from 'uikit';
import { default as SwapComponent } from 'components/Sidebar/swap';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';

const Swap: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Crumbs title={t('Swap')} />
      <Flex
        height='calc(100vh - 70px)'
        alignItems='center'
        justifyContent='center'
      >
        <SwapComponent onlySwap />
      </Flex>
    </>
  );
};

export default Swap;
