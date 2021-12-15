/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js'
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core';
import { BIG_TEN } from 'utils/bigNumber';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useDpWd } from '../../../hooks/walletInfo';
import Dots from 'components/Loader/Dots';
import { useStore } from 'store';
import { fetchApproveNumAsync, fetchWalletAsync } from 'store/wallet/reducer';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization';

const CountBox = styled(Box)`
  width: 88vw;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 410px;
  }
`
const InputBox = styled(Flex)`
position: relative;
align-items: center;
`
const Max = styled(Text)`
position: absolute;
right: 15px;
color:${({ theme }) => theme.colors.ThemeText};
cursor: pointer;
font-size: 14px;
`
const SureBtn = styled(Button)`
padding: 6px 30px;
width: 60%;
`
const MyInput = styled(Input)`
border-radius: 10px;
padding:12px 50px 12px 16px;
height: 50px;
background: ${({ theme }) => theme.colors.backgroundTextArea};
&::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`
const NumberBox = styled(Flex)`
  width: 45%;
  height: 35px;
  background: ${({ theme }) => theme.colors.input};
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 16px;
  justify-content: center;
`;

// type 1 充值 2 提币
interface init {
  type: number
  balance: number
  token: string
  TokenAddr: string
  onClose: () => void
  withdrawalBalance: string
  decimals?: number
}

const MoneyModal: React.FC<init> = ({ type, balance, token, TokenAddr, onClose, withdrawalBalance, decimals = 18 }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const [val, setVal] = useState('')
  const { drawCallback, Recharge, onApprove } = useDpWd()
  const [pending, setpending] = useState(false)
  const approvedNum = useStore(p => token === 'TIME' ? p.wallet.ApproveNum.time : p.wallet.ApproveNum.matter);

  const numberList = ['10000', '20000', '50000', '100000'];

  // 充值/提现
  const handSure = useCallback(async () => {
    setpending(true)
    if (type === 1) {
      // 充值
      if (balance === 0) {
        setpending(false)
        return
      }
      if (Number(val) <= 0) {
        setpending(false)
        return
      }
      const addPrecisionNum = new BigNumber(Number(val)).times(BIG_TEN.pow(18)).toString()
      try {
        await Recharge(TokenAddr, addPrecisionNum)
        toast.success(t('Account The transaction is successful!'));
        onClose()
      } catch (e) {
        console.error(e)
        toast.error(t('Account Recharge failed'));
      } finally {
        setpending(false)
      }
    } else {
      // 提现
      if (Number(withdrawalBalance) === 0) {
        setpending(false)
        return
      }
      if (Number(val) < 100) {
        toast.error(t('Account Minimum withdrawal amount %amount%', { amount: 100 }));
        setpending(false)
        return
      }
      try {
        await drawCallback(val, TokenAddr, token === 'TIME' ? 1 : 2)
        toast.success(t('Account The transaction is successful!'));
        onClose()
      } catch (e) {
        console.error(e)
        toast.error(t('Account Withdrawal failed!'));
      } finally {
        setpending(false)
      }
    }
    dispatch(fetchWalletAsync())
  }, [Recharge, type, balance, withdrawalBalance, TokenAddr, token, val])
  // 授权
  const handleApprove = useCallback(async () => {
    setpending(true)
    try {
      await onApprove(token)
      toast.success(t('setNftAuthorizationSuccess'));
    } catch (e) {
      console.error(e)
      toast.error(t('setNftAuthorizationFail'));
    } finally {
      setpending(false)
      dispatch(fetchApproveNumAsync(account))
    }
  }, [onApprove, account])
  // 输入框输入限制
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const chkPrice = (val) => {
        val = val.replace(/,/g, '.')
        if (Number(val) > (type === 1 ? balance : Number(withdrawalBalance))) {
          return type === 1 ? String(balance) : withdrawalBalance
        }
        return val;
      }
      if (e.currentTarget.validity.valid) {
        setVal(chkPrice(e.currentTarget.value))
      }
    },
    [setVal, balance, withdrawalBalance],
  )
  return (
    <CountBox>
      {
        type === 1 &&
        <Flex mb='20px' alignItems="center" justifyContent='space-between' flexWrap="wrap">
          {numberList.map((item, index) => (
            <NumberBox
              key={item}
              onClick={() => {
                const Num = Number(item) > balance ? String(balance) : item;
                setVal(Num);
              }}
            >
              <Text fontWeight="bold" fontSize="16px">
                {item}
              </Text>
            </NumberBox>
          ))}
        </Flex>
      }
      <Flex justifyContent="end" mb='12px'>
        <Text fontSize='14px' color='textTips'>{t('Account Available Balance')}: {getFullDisplayBalance(type === 1 ? new BigNumber(balance) : new BigNumber(Number(withdrawalBalance)), 0)}</Text>
      </Flex>
      <InputBox mb='26px'>
        <MyInput
          noShadow
          pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
          inputMode="decimal"
          value={val}
          onChange={handleChange}
          placeholder={type === 1 ? t('Account Please enter the recharge amount') : t('Account Please enter the withdrawal amount')}
        />
        <Max onClick={() => setVal(String(type === 1 ? balance : withdrawalBalance))}>MAX</Max>
      </InputBox>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <SureBtn mb='10px' disable={pending} onClick={() => {
          if (type === 1) {
            if (approvedNum > 0) {
              // 充值
              handSure()
            } else {
              // 授权
              handleApprove()
            }
          } else {
            //提现
            handSure()
          }
        }}>
          {type === 1 ?
            (pending ? <Dots>{approvedNum > 0 ? t('Account Trading') : t('Account Approving')}</Dots> : approvedNum > 0 ? t('Account Confirm') : t('Account Approve'))
            :
            (pending ? <Dots>{t('Account Trading')}</Dots> : t('Account Confirm'))
          }
        </SureBtn>
        <Text fontSize='14px' color='textTips'>{t('Account Please confirm the transaction in Token')}</Text>
      </Flex>
    </CountBox>
  )
}

export default MoneyModal;
