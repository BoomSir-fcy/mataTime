import React, { useState, useEffect, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { Flex, Box, Text } from 'uikit';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
import { TimeHeader } from './head';
import ExchangeTime from './exchange';
import { useFetchDSGApproveNum, useFetTimeInfo } from 'store/wallet/hooks';
import { useStore } from 'store';
import VestingTime from './VestingTime';
import { ComponentsWrapper } from 'components/Cirde/PageContainer';
import CommonCircle from 'components/Cirde/CommonCircle';

const VestingBox = styled(Flex)`
  height: 350px;
  align-items: center;
  justify-content: center;
  width: 40vw;
  margin: 0 auto;
  overflow: hidden;
  min-width: 300px;
  ${({ theme }) => theme.mediaQueriesSize.marginb}
`;
const CenterText = styled(Text)`
  position: absolute;
  top: 40%;
  left: 8%;
  right: 8%;
  margin: 0 auto;
  text-align: center;
`;

const Exchange: React.FC = () => {
  useFetchDSGApproveNum();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const [ToFaq, setToFaq] = useState(false);
  const [TimeShopInfo, setTimeShopInfo] = useState({
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0,
  });
  const [TimeNext, setTimeNext] = useState({
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0,
  });
  const TimeInfo = useStore(p => p.wallet.TimeInfo);
  const getTimeShopInfo = async () => {
    for (let i = 0; i < TimeInfo.length; i++) {
      if (i === TimeInfo.length - 1) {
        setTimeShopInfo(TimeInfo[i]);
      } else {
        if (TimeInfo[i].total_dsg < TimeInfo[i].max_dsg_token) {
          setTimeShopInfo(TimeInfo[i]);
          if (i + 1 < TimeInfo.length) {
            setTimeNext(TimeInfo[i + 1]);
          }
          break;
        }
      }
    }
  };
  // const showFaq = useCallback(() => setToFaq(true), [setToFaq])
  useEffect(() => {
    if (account && TimeInfo.length > 1) {
      getTimeShopInfo();
    }
  }, [TimeInfo, account]);

  return (
    <>
      <TimeHeader nowRound={TimeShopInfo} NextRound={TimeNext} />
      <ExchangeTime nowRound={TimeShopInfo} />
      <VestingBox>
        <ComponentsWrapper>
          <CommonCircle
            width='18rem'
            height='18rem'
            margin='-9rem 0 0 -9rem'
            bgWidth='48rem'
            bgHeight='19rem'
            bgMargin='-13rem 0 0 -23rem'
            isAnimation
          >
            <CenterText fontSize='30px' bold>
              {t('walleteMy Vesting TIME')}
            </CenterText>
          </CommonCircle>
        </ComponentsWrapper>
      </VestingBox>
      <VestingTime />
    </>
  );
};
export default Exchange;
