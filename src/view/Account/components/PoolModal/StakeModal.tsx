import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Box, Text, Card, Button, InputPanel, Input } from 'uikit';
import { Container } from 'components'
import { useTranslation } from 'contexts/Localization';
import Dots from 'components/Loader/Dots';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { getFullDisplayBalance } from 'utils/formatBalance';


const StakeModalBox = styled(Box)`
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

interface StakeModalProps {
  max: BigNumber
  decimals?: number
  depositSymbol?: string
  onConfirm?: (amount: string) => void
  onDismiss?: () => void
}
const StakeModal: React.FC<StakeModalProps> = ({
  decimals = 18,
  onConfirm,
  onDismiss,
  max,
  depositSymbol,
}) => {
  const { t } = useTranslation()

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
    <StakeModalBox>
      <InputPanel>
        <Flex alignItems="center" justifyContent="space-between">
          <Text bold fontSize="18px">{depositSymbol}</Text>
          <Flex alignItems="center">
            <Text fontSize="14px" color="textTips">Balance:</Text>
            <Button onClick={handleSelectMax} ml="4px" height="auto" padding="0" variant="text">
              <Text fontSize="14px" color="textTips"> {fullBalance}</Text>
            </Button>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" mt="8px">
          <InputStyled
            noShadow
            value={val}
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            min="0"
            inputMode="decimal"
            placeholder="Place enter stake amount"
            onChange={handleChange}
          />
          <Button onClick={handleSelectMax} padding="0" variant="text">
            <Text color="backgroundPrimary">Max</Text>
          </Button>
        </Flex>
      </InputPanel>
      <Flex mt="24px" justifyContent="center">
        <Button
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onConfirm(val)
              onDismiss()
              // toastSuccess(t('Staked!'), t('Your funds have been staked in the pool'))
            } catch (e) {
              // toastError(
              //   t('Error'),
              //   t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              // )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
          }} width="61.8%">
          {
            pendingTx
              ?
              <Dots>{t('Staking')}</Dots>
              :
              t('Stake')
          }
        </Button>
      </Flex>
      <Text mt="12px" textAlign="center" fontSize="14px" color="textTips">*质押物时间到期后可取出</Text>
      {/* <Text mt="8px" textAlign="center" fontSize="14px" color="textTips">
        预计到期时间：
        <Text color="orange" fontSize="14px" as="span">2020年02月20号</Text>
      </Text> */}
    </StakeModalBox>
  )
}

export default StakeModal;
