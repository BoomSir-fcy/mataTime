import React, { useState } from 'react';
import { Flex, Box, Text, Card } from 'uikit';
import { Container } from 'components'
import PoolActionHarvest from './PoolActionHarvest';
import PoolActionStake from './PoolActionStake';
import styled from 'styled-components';

const ActionBoxStyled = styled(Box)`
  background: ${({ theme }) => theme.colors.backgroundLight};
`
const ContainerItem = styled(Container)`
  padding-top: 12px;
  padding-bottom: 12px;
`

const PoolAction: React.FC = () => {

  return (
    <ActionBoxStyled>
      <ContainerItem>
        <PoolActionStake />
      </ContainerItem>
      <ContainerItem>
        <PoolActionHarvest />
      </ContainerItem>
    </ActionBoxStyled>
  )
}

export default PoolAction;
