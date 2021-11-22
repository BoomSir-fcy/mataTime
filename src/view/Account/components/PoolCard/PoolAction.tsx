import React, { useState } from 'react';
import { Flex, Box, Text, Card } from 'uikit';
import { Container } from 'components'
import PoolActionHarvest from './PoolActionHarvest';
import PoolActionStake from './PoolActionStake';

const PoolAction: React.FC = () => {

  return (
    <Box>
      <PoolActionStake />
      <PoolActionHarvest />
    </Box>
  )
}

export default PoolAction;
