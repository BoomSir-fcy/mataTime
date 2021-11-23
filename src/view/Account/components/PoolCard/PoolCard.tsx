import React, { useState } from 'react';
import styled from 'styled-components'
import { Flex, Box, Text, Card } from 'uikit';
import { Container } from 'components'
import PoolCardHeader from './PoolCardHeader'
import PoolAction from './PoolAction';

const ContainerStyled = styled(Container)`
 padding-top: 0;
`

const PoolCard: React.FC = () => {

  return (
    <Card>
      <Box>
        <PoolCardHeader />
        <ContainerStyled>
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
        </ContainerStyled>
        <PoolAction />
      </Box>
    </Card>
  )
}

export default PoolCard;
