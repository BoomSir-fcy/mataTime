import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Box, Text, Card, Button, InputPanel, Input } from 'uikit';
import { Container, } from 'components'
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { getFullDisplayBalance } from 'utils/formatBalance';


const UnStakeModalBox = styled(Box)`
  width: 88vw;
  padding-top: 8px;
  padding-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 410px;
  }
`

const InputStyled = styled(Input)`
  background-color: transparent;
`

interface UnStakeModalProps {
  max: BigNumber
  decimals?: number
  depositSymbol?: string
  onConfirm?: (amount: string) => void
  onDismiss?: () => void
}
const UnStakeModal: React.FC<UnStakeModalProps> = ({
  decimals = 18,
  onConfirm,
  onDismiss,
  max,
  depositSymbol,
}) => {

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, decimals)
  }, [max, decimals])

  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <UnStakeModalBox>
      1
    </UnStakeModalBox>
  )
}

export default UnStakeModal;
