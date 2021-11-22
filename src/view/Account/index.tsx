import React, { useState } from 'react';
import { Flex, Box } from 'uikit';
import { PageSection } from 'components'
import TokenAccount from './components/TokenAccount';
import LpFarm from './components/LpFarm';
import Pools from './components/Pools';


const Account: React.FC = () => {

  return (
    <PageSection>
      <TokenAccount />
      <LpFarm />
      <Pools />
    </PageSection>
  )
}

export default Account;