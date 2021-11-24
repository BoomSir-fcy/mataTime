/* eslint-disable */
import React, { useCallback, useState } from 'react';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { splitThousandSeparator } from 'utils/formatBalance';

const CountBox = styled(Box)`
min-width: 20vw;
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
  token: string
}

const MoneyModal: React.FC<init> = ({ type, balance, token }) => {

  const [val, setVal] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const chkPrice = (obj) => {
        obj = obj.replace(/[^\d.]/g, "");
        //必须保证第一位为数字而不是. 
        obj = obj.replace(/^\./g, "");
        //保证只有出现一个.而没有多个. 
        obj = obj.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上 
        obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        return obj;
      }
      if (e.currentTarget.validity.valid) {
        setVal(chkPrice(e.currentTarget.value))
      }
    },
    [setVal],
  )
  return (
    <CountBox>
      <Flex justifyContent="end" mb='12px'>
        {type === 2 && <Text fontSize='14px' color='textTips'>可用余额: {splitThousandSeparator(balance)}</Text>}
      </Flex>
      <InputBox mb='26px'>
        <MyInput
          noShadow
          value={val}
          onChange={handleChange}
          placeholder={type === 1 ? '请输入充值金额' : '请输入提现金额'}
        />
        <Max onClick={() => setVal(String(balance))}>MAX</Max>
      </InputBox>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <SureBtn mb='10px'>确认</SureBtn>
        <Text fontSize='14px' color='textTips'>请在Token里确认交易</Text>
      </Flex>
    </CountBox>
  )
}

export default MoneyModal;
