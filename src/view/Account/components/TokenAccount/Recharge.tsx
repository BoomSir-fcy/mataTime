/* eslint-disable */
import React, { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js'
import { Flex, Box, Text, Input, Button } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux'
import { useDpWd } from '../../hooks/walletInfo';
import { BIG_TEN } from 'utils/bigNumber';
import { toast } from 'react-toastify';
import { fetchApproveNumAsync, fetchWalletAsync } from 'store/wallet/reducer';
import { getFullDisplayBalance } from 'utils/formatBalance';
import Dots from 'components/Loader/Dots';
import { ModalWrapper } from 'components';
import HistoryModal from './Pops/HistoryModal';



const Content = styled(Box)`
flex: 1;
min-width: 60%;
min-height: 175px;
${({ theme }) => theme.mediaQueriesSize.padding}
border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`
const LeftBox = styled(Box)`
min-width: 230px;
flex:1;
`
const Title = styled(Flex)`
  align-items: center;
`
const NumberBox = styled(Flex)`
  width: 100px;
  height: 35px;
  background: ${({ theme }) => theme.colors.backgroundMenu};
  box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:nth-child(odd){
    margin-right: 16px;
  }
  &:nth-child(1),&:nth-child(2){
    margin-bottom: 16px;
  }
`
const RightBox = styled(Box)`
flex:1;
min-width: 230px;
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
background: ${({ theme }) => theme.colors.backgroundPrimary};
width: 100%;
`
const MyInput = styled(Input)`
border-radius: 10px;
padding:12px 50px 12px 16px;
height: 50px;
background: ${({ theme }) => theme.colors.backgroundTextArea};
&::placeholder {
  font-size: 14px;
    color: ${({ theme }) => theme.colors.textTips};
  }
`

interface init {
  balance: number
  TokenAddr: string
  decimals?: number
}

const Recharge: React.FC<init> = ({ balance, TokenAddr, decimals = 18 }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { account } = useWeb3React()

  const [val, setVal] = useState('')
  const [visibleHistory, setVisibleHistory] = useState(false)
  const [pending, setpending] = useState(false)
  const [ActiveHistory, setActiveHistory] = useState(1)

  const { Recharge, onApprove } = useDpWd()
  const approvedNum = useStore(p => p.wallet.ApproveNum.time);

  const numberList = ['10', '100', '1000', '2000']

  // 充值
  const handSure = useCallback(async () => {
    setpending(true)
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
      setVal('')
    } catch (e) {
      console.error(e)
      toast.error(t('Account Recharge failed'));
    } finally {
      setpending(false)
    }
    dispatch(fetchWalletAsync())
  }, [Recharge, balance, TokenAddr, val])
  // 授权
  const handleApprove = useCallback(async () => {
    setpending(true)
    try {
      await onApprove()
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
        // val = val.replace(/[^\d.]/g, "");
        // //必须保证第一位为数字而不是. 
        // val = val.replace(/^\./g, "");
        // //保证只有出现一个.而没有多个. 
        // val = val.replace(/\.{2,}/g, ".");
        // //保证.只出现一次，而不能出现两次以上 
        // val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        val = val.replace(/,/g, '.')
        if (Number(val) > balance) {
          return String(balance)
        }
        return val;
      }
      if (e.currentTarget.validity.valid) {
        setVal(chkPrice(e.currentTarget.value))
      }
    },
    [setVal, balance],
  )

  return (
    <Content>
      <Flex flexWrap='wrap' justifyContent='space-between' alignItems='center'>
        <LeftBox>
          <Title mb='24px'>
            <Text mr='28px' fontSize='16px'>充值Time</Text>
            <Text style={{ cursor: 'pointer' }} fontSize='14px' color='textPrimary' onClick={() => setVisibleHistory(true)}>{t('Account history record')}</Text>
          </Title>
          <Flex alignItems='center' flexWrap='wrap'>
            {
              numberList.map((item, index) => (
                <NumberBox key={item} onClick={() => {
                  const Num = Number(item) > balance ? String(balance) : item
                  setVal(Num)
                }}>
                  <Text fontWeight='bold' fontSize='16px'>{item}</Text>
                </NumberBox>
              ))
            }
          </Flex>
        </LeftBox>
        <RightBox>
          <Flex justifyContent="end" mb='12px'>
            <Text fontSize='14px' color='textTips'>{t('Account Available Balance')}: {getFullDisplayBalance(new BigNumber(balance), 0)}</Text>
          </Flex>
          <InputBox mb='14px'>
            <MyInput
              noShadow
              pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
              inputMode="decimal"
              value={val}
              onChange={handleChange}
              placeholder={t('Account Please enter the recharge amount')}
            />
            <Max onClick={() => setVal(String(balance))}>MAX</Max>
          </InputBox>
          <Flex flexDirection='column' justifyContent='center' alignItems='center'>
            <SureBtn disable={pending} onClick={() => {
              if (approvedNum > 0) {
                // 充值、提现
                handSure()
              } else {
                // 授权
                handleApprove()
              }
            }}>
              {pending ? <Dots>{approvedNum > 0 ? t('Account Trading') : t('Account Approving')}</Dots> : approvedNum > 0 ? t('AccountRecharge') : t('Account Approve')}
            </SureBtn>
          </Flex>
        </RightBox>
      </Flex>
      {/* 提币、充值记录 */}
      <ModalWrapper title={`Time${t('Account history record')}`} creactOnUse visible={visibleHistory} setVisible={setVisibleHistory}>
        {/* <PopHeard mb="8px" justifyContent="space-between" alignItems="center">
          <Flex alignItems="baseline">
            <HistoryHead className={ActiveHistory === 1 ? 'active' : ''} onClick={() => setActiveHistory(1)} scale='ld'>充值记录</HistoryHead>
            <HistoryHead className={ActiveHistory === 2 ? 'active' : ''} onClick={() => setActiveHistory(2)} scale='ld'>提现记录</HistoryHead>
          </Flex>
          <Button onClick={() => setVisibleHistory(false)} padding="0" variant="text">
            <CloseLineIcon width={16} color="primary"></CloseLineIcon>
          </Button>
        </PopHeard> */}
        <HistoryModal token='Time' type={ActiveHistory} />
      </ModalWrapper>
    </Content>
  )
}

export default Recharge;