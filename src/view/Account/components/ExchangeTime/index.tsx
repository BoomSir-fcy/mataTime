import React, { useState, useEffect, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components';
import { Flex, Box, Text } from 'uikit';
import { useWeb3React } from '@web3-react/core';
import { WalletHead } from '../../head';
import { useTranslation } from 'contexts/Localization';
import { TimeHeader } from './head';
import ExchangeTime from './exchange';
import { useFetchDSGApproveNum, useFetTimeInfo } from 'store/wallet/hooks';
import { useStore } from 'store';
import VestingTime from './VestingTime';
import { ComponentsWrapper } from "components/Cirde/PageContainer";
import CommonCircle from "components/Cirde/CommonCircle";


const ScrollBox = styled(Box)`
height:calc(100vh - 70px);
overflow-y: auto;
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
-ms-overflow-style: none;
scrollbar-width: none;
`
const VestingBox = styled(Flex)`
height:350px;
align-items: center;
justify-content: center;
width: 36rem;
margin: 0 auto;
overflow: hidden;
${({ theme }) => theme.mediaQueriesSize.marginb}
`

const Exchange: React.FC = () => {
  useFetchDSGApproveNum()
  useFetTimeInfo()
  const { t } = useTranslation();
  const { account } = useWeb3React()
  const [ToFaq, setToFaq] = useState(false)
  const [TimeShopInfo, setTimeShopInfo] = useState({
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0
  })
  const [TimeNext, setTimeNext] = useState({
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0
  })
  const TimeInfo = useStore(p => p.wallet.TimeInfo);
  const getTimeShopInfo = async () => {
    for (let i = 0; i < TimeInfo.length; i++) {
      if (i === TimeInfo.length - 1) {
        setTimeShopInfo(TimeInfo[i])
      } else {
        if (TimeInfo[i].total_dsg < TimeInfo[i].max_dsg_token) {
          setTimeShopInfo(TimeInfo[i])
          if (i + 1 < TimeInfo.length) {
            setTimeNext(TimeInfo[i + 1])
          }
          break
        }
      }
    }
  }
  // const showFaq = useCallback(() => setToFaq(true), [setToFaq])
  useEffect(() => {
    if (account && TimeInfo.length > 1) {
      getTimeShopInfo()
    }
  }, [TimeInfo, account])

  return (
    <>
      <WalletHead title={t('Time兑换')} />
      <ScrollBox>
        <TimeHeader nowRound={TimeShopInfo} NextRound={TimeNext} />
        <ExchangeTime nowRound={TimeShopInfo} />
        <VestingBox>
          <ComponentsWrapper>
            <CommonCircle width="18rem" height="18rem" margin="-9rem 0 0 -9rem" bgWidth="48rem" bgHeight="19rem" bgMargin="-13rem 0 0 -23rem" isAnimation>
              <Text fontSize='30px' bold>My Vesting Time</Text>
            </CommonCircle>
          </ComponentsWrapper>
        </VestingBox>
        <VestingTime />
      </ScrollBox>
    </>
  )
}
export default Exchange