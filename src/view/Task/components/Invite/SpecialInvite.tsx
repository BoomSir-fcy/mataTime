import React, { useState } from 'react';
import { Icon } from 'components';
import styled from 'styled-components';
import { Text, Flex, Box } from 'uikit';
import { Step } from './step';
import { useTranslation } from 'contexts/Localization';
import { StakeNFT } from '../NftList';

const SpecialInvite: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Flex flexDirection='column'>
      <Text>{t('SpecialInvitationDescribe')}</Text>
      <Flex flexWrap='wrap' justifyContent='space-between' alignItems='center'>
        <Step />
        <StakeNFT />
      </Flex>
    </Flex>
  );
});

export default SpecialInvite;
