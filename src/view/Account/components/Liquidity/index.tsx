import React, { useState } from 'react';
import { Flex, Box, Text } from 'uikit';
import { Container, FlexAutoWarpper, FlexLayout } from 'components'
import PoolCard from '../PoolCard/PoolCard';

const Liquidity: React.FC = () => {

  return (
    <Container>
      <FlexLayout>
        <FlexAutoWarpper>
          <PoolCard />
          <PoolCard />
          <PoolCard />
        </FlexAutoWarpper>
      </FlexLayout>
    </Container>
  )
}

export default Liquidity;
