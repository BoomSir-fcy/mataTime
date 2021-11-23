import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, Box, Text, Card, Button, MinusBtnIcon, AddBtnIcon } from 'uikit';
import { Container, ModalWrapper } from 'components'
import StakeModal from '../PoolModal/StakeModal'

const ButtonStyled = styled(Button)`
  padding: 0 8px;
`



const PoolActionStake: React.FC = () => {

  const [visible, setVisible] = useState(false)
  const [testVal, setTestVal] = useState(1)

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text color="">Your stake</Text>
          <Text>2154.2151</Text>
        </Box>
        <Box>
          <Flex>
            <ButtonStyled onClick={() => setVisible(true)} variant="text"><AddBtnIcon /></ButtonStyled>
            <ButtonStyled variant="text"><MinusBtnIcon /></ButtonStyled>
          </Flex>
        </Box>
      </Flex>
      <ModalWrapper creactOnUse visible={visible} setVisible={setVisible}>
        <StakeModal />
      </ModalWrapper>
    </Box>
  )
}

export default PoolActionStake;
