import React, { useCallback, useState } from 'react';
import { Flex, Box, Text, Card, Button, InputPanel, Input } from 'uikit';
import { Container, } from 'components'
import styled from 'styled-components';


const StakeModal: React.FC = () => {

  const [val, setVal] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )
  return (
    <Box>
      <InputPanel>
        <Flex justifyContent="space-between">
          <Text>Stake</Text>
          <Text>Balance: 0.0215</Text>
        </Flex>
        <Flex>
          <Input
            noShadow
            value={val}
            onChange={handleChange}
          />
          <Text>Balance: 0.0215</Text>
        </Flex>
      </InputPanel>
    </Box>
  )
}

export default StakeModal;
