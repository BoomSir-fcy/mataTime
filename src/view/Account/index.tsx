import React, { useState } from 'react';
import { Flex, Box } from 'uikit';
import { PageSection } from 'components'
import TokenAccount from './components/TokenAccount';
import Liquidity from './components/Liquidity';
import Single from './components/Single';


const Account: React.FC = () => {

  return (
    <PageSection>
      <TokenAccount />
      <Liquidity />
      <Single />
    </PageSection>
  )
}

export default Account;