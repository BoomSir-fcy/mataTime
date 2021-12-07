/* eslint-disable */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components';
import { Flex, Button, Box, Text, Input, Progress, AnimationRingIcon } from 'uikit';
import { getDsgAddress } from 'utils/addressHelpers';
import {
  useTokenBalance,
  useApproveErc20Change,
  useExchangeErc20,
} from './hook';
import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts/Localization';
import { formatDisplayApr } from 'utils/formatBalance';
import { TimeInfo } from 'store/wallet/type';
import { useStore } from 'store';
import { useDispatch } from 'react-redux'
import { fetchDSGApproveNumAsync, fetchTimeExchangeList, fetchTimeShopInfo } from 'store/wallet/reducer';
import { useToast } from 'hooks';
// import { ComponentsWrapper, PageContainer } from "components/Cirde/PageContainer";
// import CommonCircle from "components/Cirde/CommonCircle";


const Center = styled(Flex)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  color:${({ theme }) => theme.colors.white_black};
  width: 45%;
  margin: 0 auto;
  position: relative;
`

const Head = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.marginb}
`
const SwapBox = styled(Box)`
`
const InputBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  background:${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 10px;
  margin-bottom: 16px;
  img{
    width: 23px;
  }
`
const SmFont = styled(Text)`
  font-size:14px;
`
const InputStyle = styled(Input)`
  color:${({ theme }) => theme.colors.white_black};
  padding: 0;
  width: auto;
  flex: 1;
`

const TimeBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  background:${({ theme }) => theme.colors.backgroundTextArea};
  ${({ theme }) => theme.mediaQueriesSize.marginbmd}
  border-radius: 10px;
  img{
    width: 40px;
  }
`
const TimeNum = styled(Flex)`
  ${({ theme }) => theme.mediaQueriesSize.marginbmd}
`
const Rule = styled(Text)`
  ${({ theme }) => theme.mediaQueriesSize.marginb}
`
const ButtonStyle = styled(Button)`
  width:100%;
`
const FAQ = styled(Flex)`
position: absolute;
right: -220px;
top: 70px;
`
const FaqBox = styled(Box)`

`
interface init {
  nowRound: TimeInfo,
  decimals?: number,
  showFaq: () => void
}
const ExchangeTime: React.FC<init> = ({ nowRound, decimals = 18, showFaq }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const [pending, setpending] = useState(false)
  const [inputNum, setinputNum] = useState('');
  const approvedNum = useStore(p => p.wallet.ApproveNum.dsg);
  const address = getDsgAddress()
  const { balance: DsgBalance } = useTokenBalance(address)
  // const timeAddress = getTimeAddress()
  // const { balance: timeBalance } = useTokenBalance(timeAddress)
  const { onApprove } = useApproveErc20Change()
  const { onExchange } = useExchangeErc20()
  const { toastError, toastWarning, toastSuccess } = useToast();


  const Time = useMemo(() => {
    const num = new BigNumber(Number(inputNum)).times(nowRound.max_time_token).div(nowRound.max_dsg_token).toNumber()
    return num
  }, [nowRound, inputNum])

  const ReleaseNow = useMemo(() => {
    const num = new BigNumber(nowRound.right_now_release).div(10000).times(100).toNumber();
    return num
  }, [nowRound])

  const ReleaseLater = useMemo(() => {
    const num = 100 - ReleaseNow;
    return num
  }, [ReleaseNow])

  const Circulation = useMemo(() => {
    const num = new BigNumber(ReleaseNow).div(100).times(Time).toNumber();
    return num
  }, [Time, ReleaseNow])

  const Lock = useMemo(() => {
    const num = new BigNumber(ReleaseLater).div(100).times(Time).toNumber();
    return num
  }, [Time, ReleaseLater])

  const RedeemedTime = useMemo(() => {
    const Proportion = new BigNumber(nowRound.max_time_token).div(nowRound.max_dsg_token).toNumber()
    const num = new BigNumber(nowRound.total_dsg).times(Proportion).toNumber();
    return num
  }, [nowRound])

  const RemainingNum = useMemo(() => {
    const num = new BigNumber(nowRound.max_time_token).minus(Number(RedeemedTime)).toNumber()
    return num
  }, [nowRound, RedeemedTime])

  // 兑换
  const handleExchange = useCallback(async () => {
    console.log(Time, RemainingNum);

    if (Time > (RemainingNum)) {
      toastWarning(`${t('Time最大兑换量:')}${RemainingNum}`);
      return
    }
    if (inputNum === '') {
      return
    }
    try {
      setpending(true)
      await onExchange(Number(inputNum))
      dispatch(fetchTimeShopInfo())
      dispatch(fetchTimeExchangeList({ account, page: 1 }))
      toastSuccess(t('Account The transaction is successful!'));
    } catch (e) {
      console.error(e)
      toastError(t('NFT Operation failed'));
    } finally {
      setpending(false)
      setinputNum('')
    }
  }, [onExchange, setinputNum, dispatch, account, inputNum, Time, RemainingNum])
  // 授权
  const handleApprove = useCallback(async () => {
    try {
      setpending(true)
      await onApprove()
      dispatch(fetchDSGApproveNumAsync(account))
      toastSuccess(t('setNftAuthorizationSuccess'));
    } catch (e) {
      console.error(e)
      toastError(t('setNftAuthorizationFail'));
    } finally {
      setpending(false)
    }
  }, [onApprove, dispatch, account])

  // 输入框输入限制
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const chkPrice = (val) => {
        val = val.replace(/,/g, '.')
        if (Number(val) > DsgBalance) {
          return String(DsgBalance)
        }
        return val;
      }
      if (e.currentTarget.validity.valid) {
        setinputNum(chkPrice(e.currentTarget.value))
      }
    },
    [setinputNum, DsgBalance],
  )

  return (
    <Center flexDirection='column' justifyContent='center'>
      <Head>
        <Text mb='14px' fontSize='18px'>$TIME to be exchanged</Text>
        <Progress scale='sm' variant='round' primaryStep={(new BigNumber(RedeemedTime).div(nowRound.max_time_token)).times(100).toNumber()} />
        <Flex pt='14px' justifyContent='space-between'>
          <Text color='textTips'>{formatDisplayApr(RedeemedTime)}</Text>
          <Text color='textTips'>{formatDisplayApr(nowRound.max_time_token)}</Text>
        </Flex>
      </Head>
      <SwapBox>
        <InputBox>
          <Flex mb='4px' justifyContent='space-between'>
            <SmFont>兑换</SmFont>
            <Flex>
              <SmFont mr='16px' color='textTips'>余额：{formatDisplayApr(DsgBalance)}</SmFont>
              <SmFont style={{ cursor: 'pointer' }} onClick={() => {
                setinputNum(String(DsgBalance))
              }} >MAX</SmFont>
            </Flex>
          </Flex>
          <Flex alignItems='center'>
            <InputStyle
              noShadow
              pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
              inputMode="decimal"
              value={inputNum}
              onChange={handleChange}
              placeholder={t('请输入兑换数量')}
            />
            <Flex alignItems='center'>
              <img src="/images/tokens/DSG.svg" alt="" />
              <Text ml='8px' fontSize='14px' bold>DSG</Text>
            </Flex>
          </Flex>
        </InputBox>
        <TimeBox>
          <TimeNum justifyContent='center' alignItems='center'>
            <img src="/images/tokens/TIME.svg" alt="" />
            <Flex ml='14px' flexDirection='column' justifyContent='space-between'>
              <Text fontSize='18px' bold>{formatDisplayApr(Time)}</Text>
              <Text fontSize='14px' color='textTips'>可获得Time</Text>
            </Flex>
          </TimeNum>
          <Flex justifyContent='space-between' alignItems='center'>
            <Box>
              <Text fontSize='14px' color='textTips'>流通</Text>
              <Text>{formatDisplayApr(Circulation)}</Text>
            </Box>
            <Box style={{ textAlign: 'right' }}>
              <Text fontSize='14px' color='textTips'>锁仓线性释放</Text>
              <Text>{formatDisplayApr(Lock)}</Text>
            </Box>
          </Flex>
        </TimeBox>
        <Rule fontSize='14px' color='textTips'>
          {t('*锁仓规则：%now%%立即释放，%later%%在未来4年之内线性解锁',
            {
              now: ReleaseNow,
              later: ReleaseLater
            })}
        </Rule>
        <ButtonStyle disabled={pending} onClick={async () => {
          if (approvedNum > 0) {
            // 兑换
            await handleExchange()
          } else {
            // 授权
            await handleApprove()
          }
        }}>{pending ? <Dots>{approvedNum > 0 ? "兑换中" : "授权中"}</Dots> : approvedNum > 0 ? "兑换" : "授权"}</ButtonStyle>
      </SwapBox>
      <FAQ onClick={showFaq}>
        {/* <CommonCircle hideBg={true} width="10rem" height="10rem" margin="-78px 0 0px -80px" isAnimation>
          <Text fontSize="30px" lineHeight="54px" bold>FAQ</Text>
        </CommonCircle> */}
        <AnimationRingIcon style={{ cursor: 'pointer' }} active1 active3 bgColor showImg isRotate width="8rem">
          <FaqBox>
            <Text style={{ cursor: 'pointer' }} mb='6px' fontSize="30px" bold>FAQ</Text>
          </FaqBox>
        </AnimationRingIcon>
      </FAQ>
    </Center>
  )
}
export default ExchangeTime