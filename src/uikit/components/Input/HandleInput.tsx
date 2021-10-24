import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Text, Flex, AddIcon, MinusIcon, Button, Box, IconButton } from 'uikit'
import styled from 'styled-components'
// useFetchMysteryBoxs

import Input from './Input'

interface HandleInputProps {
  max?: number
  value: string
  onChange: (value: string) => void
}

const FlexStyled = styled(Flex)`
  background-size: 100%;
  width: 140px;
  height: 48px;
  padding: 0 5px;
`
const InputStyled = styled(Input)`
  width: 50px;
  padding: 5px;
  min-width: 50px;
  box-shadow: none;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
  background: transparent;
`


const HandleInput: React.FC<HandleInputProps> = ({ value, max, onChange }) => {

  const [touchTimer, setTouchTimer] = useState(null)
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        let tempValue = e.currentTarget.value.replace(/[^\d]/g, '')
        if (Number(tempValue) > max) tempValue = `${max}`
        onChange(tempValue)
      }
    },
    [onChange, max],
  )

  const handleMinus = useCallback((currentValue) => {
    let currencyVal = (Number(currentValue) || 0) - 1
    if (currencyVal < 0) {
      currencyVal = 0;
    }
    onChange(`${currencyVal}`)
  }, [onChange])

  const handleAdd = useCallback((currentValue) => {
    let currencyVal = (Number(currentValue) || 0) + 1
    if (currencyVal > max) {
      currencyVal = max;
    }
    onChange(`${currencyVal}`)
  }, [max, onChange])

  const touchStartHandle = useCallback((handle) => {
    setTouchTimer(setTimeout(() => {
      setTouchTimer(setInterval(() =>{
          handle(value)
        }, 100))
    }, 800))
  }, [setTouchTimer, value])
  const clearTouchTimer = useCallback((handle) => {
    touchTimer && clearInterval(touchTimer)
  }, [touchTimer])

  


  return (
    <FlexStyled justifyContent="space-between" alignItems="center">
      <Button
        // onMouseDown={() => touchStartHandle(handleMinus)}
        // onMouseUp={clearTouchTimer}
        // onTouchStart={() => touchStartHandle(handleMinus)}
        // onTouchEnd={clearTouchTimer}
        padding="0 5px" variant="left" onClick={() => handleMinus(value)}>
        <MinusIcon color="#fff" />
      </Button>
      <InputStyled onChange={handleChange} value={value} type="text" />
      <Button
        // onMouseDown={() => touchStartHandle(handleAdd)}
        // onMouseUp={clearTouchTimer}
        // onTouchStart={() => touchStartHandle(handleAdd)}
        // onTouchEnd={clearTouchTimer}
        padding="0 5px" variant="right" onClick={() => handleAdd(value)} >
        <AddIcon color="#fff" />
      </Button>
      {/* <Button scale="sm" variant="text">MAX</Button> */}
    </FlexStyled>
  )
}

export default HandleInput
