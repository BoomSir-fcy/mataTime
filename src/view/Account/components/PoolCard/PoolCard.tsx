import React, { useState } from 'react';
import { Flex, Box, Text, Card } from 'uikit';
import { Container } from 'components'
import PoolCardHeader from './PoolCardHeader'
import PoolAction from './PoolAction';

const PoolCard: React.FC = () => {

  return (
    <Card>
      <Box>
        <PoolCardHeader />
        <Flex justifyContent="space-between">
          <Box>
            <Text>ARP</Text>
            <Text>253%</Text>
          </Box>
          <Box>
            <Text textAlign="right">Liquidity</Text>
            <Text textAlign="right">$ 111.122</Text>
          </Box>
        </Flex>
        <PoolAction />
      </Box>
    </Card>
  )
}

export default PoolCard;
