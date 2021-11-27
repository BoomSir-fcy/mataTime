/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js'
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core';
import { BIG_TEN } from 'utils/bigNumber';
import { splitThousandSeparator } from 'utils/formatBalance';
import { useDpWd } from '../../../hooks/walletInfo';
import Dots from 'components/Loader/Dots';
import { useStore } from 'store';
import { fetchApproveNumAsync, fetchWalletAsync } from 'store/wallet/reducer';
import { toast } from 'react-toastify';

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
background: ${({ theme }) => theme.colors.backgroundPrimary};
width: 60%;
`
const MyInput = styled(Input)`
border-radius: 10px;
padding:12px 50px 12px 16px;
height: 50px;
&::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`
// type 1 充值 2 提币
interface init {
  type: number,
  balance: number,
  token: string,
  TokenAddr: string,
  onClose: () => void
  withdrawalBalance: string,
}

const MoneyModal: React.FC<init> = ({ type, balance, token, TokenAddr, onClose, withdrawalBalance }) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const [val, setVal] = useState('')
  const { drawCallback, Recharge, onApprove } = useDpWd()
  const [pending, setpending] = useState(false)
  const approvedNum = useStore(p => token === 'Time' ? p.wallet.ApproveNum.time : p.wallet.ApproveNum.matter);


  // 充值/提现
  const handSure = useCallback(async () => {
    setpending(true)
    if (type === 1) {
      if (balance === 0) {
        setpending(false)
        return
      }
      // 充值
      const addPrecisionNum = new BigNumber(Number(val)).times(BIG_TEN.pow(18)).toString()
      try {
        await Recharge(TokenAddr, addPrecisionNum)
        onClose()
      } catch (e) {
        console.error(e)
      } finally {
        setpending(false)
      }
    } else {
      if (Number(withdrawalBalance) === 0) {
        setpending(false)
        return
      }
      if (Number(val) < 100) {
        toast.error('最先提现额度100');
        setpending(false)
        return
      }
      // 提现
      try {
        await drawCallback(val, TokenAddr, token === 'Time' ? 1 : 2)
        onClose()
      } catch (e) {
        console.error(e)
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
      await onApprove()
    } catch (e) {
      console.error(e)
    } finally {
      setpending(false)
      dispatch(fetchApproveNumAsync(account))
    }
  }, [onApprove, account])
  // 输入框输入限制
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const chkPrice = (val) => {
        // val = val.replace(/[^\d.]/g, "");
        // //必须保证第一位为数字而不是. 
        // val = val.replace(/^\./g, "");
        // //保证只有出现一个.而没有多个. 
        // val = val.replace(/\.{2,}/g, ".");
        // //保证.只出现一次，而不能出现两次以上 
        // val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        val = val.replace(/\D/g, '')
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
      <Flex justifyContent="end" mb='12px'>
        <Text fontSize='14px' color='textTips'>可用余额: {splitThousandSeparator(type === 1 ? balance : Number(withdrawalBalance))}</Text>
      </Flex>
      <InputBox mb='26px'>
        <MyInput
          noShadow
          value={val}
          onChange={handleChange}
          placeholder={type === 1 ? '请输入充值金额' : '请输入提现金额'}
        />
        <Max onClick={() => setVal(String(type === 1 ? balance : withdrawalBalance))}>MAX</Max>
      </InputBox>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <SureBtn mb='10px' disable={pending} onClick={() => {
          if (approvedNum > 0) {
            // 充值、提现
            handSure()
          } else {
            // 授权
            handleApprove()
          }
        }}>
          {pending ? <Dots>{approvedNum > 0 ? "交易中" : "授权中"}</Dots> : approvedNum > 0 ? "确认" : "授权"}
        </SureBtn>
        <Text fontSize='14px' color='textTips'>请在Token里确认交易</Text>
      </Flex>
    </CountBox>
  )
}

export default MoneyModal;
