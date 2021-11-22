import React, { useState } from 'react';
import { Flex, Box, Text, Card, Button, MinusBtnIcon, AddBtnIcon } from 'uikit';
import { Container } from 'components'
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  padding: 0 8px;
`

const PoolActionStake: React.FC = () => {

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Text color="">Your stake</Text>
        <Text>2154.2151</Text>
      </Box>
      <Box>
        <Flex>
          <ButtonStyled variant="text"><AddBtnIcon /></ButtonStyled>
          <ButtonStyled variant="text"><MinusBtnIcon /></ButtonStyled>
        </Flex>
      </Box>
    </Flex>
  )
}

export default PoolActionStake;
