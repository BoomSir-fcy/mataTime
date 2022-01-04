import React, { useState, useEffect, useMemo } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components';
import { RouteComponentProps } from 'react-router-dom';
import WalletBox from './walletBox';
import Recharge from './Recharge';
import { getMatterAddress, getTimeAddress } from 'utils/addressHelpers';
import {
  useFetchWalletInfo,
  useFetchApproveNum,
  useFetTimeIncometoday,
  useFetTimeIncomeList,
  useFetchMinimum,
} from 'store/wallet/hooks';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';
import { formatDisplayApr, getBalanceAmount } from 'utils/formatBalance';
import EarningsRecord from './EarningsRecord';
import Chart from './Chart';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import {
  fetchTimeIncometoday,
  fetchMatterIncometoday,
  fetchIncomeList,
  fetchMatterIncomeList,
} from 'store/wallet/reducer';
import useMenuNav from 'hooks/useMenuNav';
import { useTokenBalance } from 'hooks/useTokenBalance';
import { useInviteCount } from 'view/Task/hooks/matter';
import { Icon } from 'components';

const NoPdBottom = styled(Container)`
  padding: 0;
`;
const ScrollBox = styled(Box)``;
const BorderWalletBox = styled(WalletBox)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${({ theme }) => theme.mediaQueries.sm} {
    border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  }
`;
const ContentTab = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  padding-bottom: 0;
  padding-top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  .active {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.white_black};
    font-weight: bold;
  }
`;
const TabText = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  ${({ theme }) => theme.mediaQueriesSize.marginr}
  font-size: 14px;
  cursor: pointer;
`;
const RightBox = styled(Flex)`
  min-width: 23vw;
  flex-wrap: wrap;
`;
const IncomeBox = styled(Flex)`
  align-items: center;
  ${({ theme }) => theme.mediaQueriesSize.marginr}
  width: max-content;
  /* min-width: 160px; */
`;
const Img = styled.img`
  display: inline-block;
  width: 26px;
  height: 26px;
  margin-right: 12px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 36px;
    height: 36px;
  }
`;

const PostTab = styled(ContentTab)`
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const IncomeComp = ({ TodayIncome, TotalIncome, isMobile }) => {
  const size = isMobile ? 26 : 36;
  const { t } = useTranslation();
  const { inviteInfo } = useInviteCount();
  return (
    <RightBox justifyContent='space-between' alignItems='center'>
      <IncomeBox>
        <Icon
          size={size}
          color='white_black'
          current={1}
          name='icon-zhifeiji1'
        />
        {/* <Img src={require('assets/images/myWallet/airplane.png').default} /> */}
        <Flex ml='12px' flexDirection='column' justifyContent='space-between'>
          <Text fontSize='14px' color='textTips'>
            {t('My Rebate(TIME)')}
          </Text>
          <Text color='white_black' fontWeight='bold'>
            {inviteInfo.total_rebate}
          </Text>
        </Flex>
      </IncomeBox>
      <IncomeBox>
        <Icon
          size={size}
          color='white_black'
          current={1}
          name='icon-leijishouyi'
        />
        {/* <Img src={require('assets/images/myWallet/today.png').default} /> */}
        <Flex ml='12px' flexDirection='column' justifyContent='space-between'>
          <Text fontSize='14px' color='textTips'>
            {t('Account Day income')}
          </Text>
          <Text color='white_black' fontWeight='bold'>
            {formatDisplayApr(TodayIncome)}
          </Text>
        </Flex>
      </IncomeBox>
      <IncomeBox>
        <Icon
          size={size}
          color='white_black'
          current={1}
          name='icon-zongshouyi'
        />
        {/* <Img src={require('assets/images/myWallet/total.png').default} /> */}
        <Flex ml='12px' flexDirection='column' justifyContent='space-between'>
          <Text fontSize='14px' color='textTips'>
            {t('Account Cumulative income')}
          </Text>
          <Text color='white_black' fontWeight='bold'>
            {formatDisplayApr(TotalIncome)}
          </Text>
        </Flex>
      </IncomeBox>
    </RightBox>
  );
};

const TokenAccount: React.FC<RouteComponentProps> = React.memo(route => {
  useFetchWalletInfo();
  useFetchApproveNum();
  useFetchMinimum();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { isPushed, setIsPushed, isMobile } = useMenuNav();
  const info = {
    address: '',
    available_balance: '0',
    freeze_balance: '0',
    token_type: 1,
    total_balance: '0',
    uid: 0,
  };
  const [WalletInfo, setWalletInfo] = useState(info);
  const [walletBalance, setwalletBalance] = useState('0');
  const [tokenAddress, settokenAddress] = useState('');
  const [ActiveToken, setActiveToken] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [day, setday] = useState(7);
  const [readType, setreadType] = useState(1);
  const [TokenWithDrawMinNum, setTokenWithDrawMinNum] = useState('0');
  const timeAddress = getTimeAddress();
  const MatterAddress = getMatterAddress();
  const { balance: timeBalance } = useTokenBalance(timeAddress);
  const { balance: matterBalance } = useTokenBalance(MatterAddress);
  const BalanceList = useStore(p => p.wallet.wallet);
  const activeToken = useStore(p => p.wallet.activeToken);
  const TimeIncometoday = useStore(p => p.wallet.TimeIncometoday);
  const MatterIncometoday = useStore(p => p.wallet.MatterIncometoday);
  const ContentHistoryInfo = useStore(p => p.wallet.TimeIncomeList);
  const TaskHistoryinfo = useStore(p => p.wallet.MatterIncomeList);
  const WithDrawMinNum = useStore(p => p.wallet.WithDrawMinNum);

  // useFetTimeIncometoday(day);
  // useFetTimeIncomeList(1, pageSize, 1);

  const TodayIncome = useMemo(() => {
    let num;
    if (ActiveToken === 1) {
      num = Number(TimeIncometoday.today_income);
    } else {
      num = Number(MatterIncometoday.today_income);
    }
    return num;
  }, [TimeIncometoday, MatterIncometoday, ActiveToken]);

  const TotalIncome = useMemo(() => {
    let num;
    if (ActiveToken === 1) {
      num = Number(TimeIncometoday.total_income);
    } else {
      num = Number(MatterIncometoday.total_income);
    }
    return num;
  }, [TimeIncometoday, MatterIncometoday, ActiveToken]);

  const ChartList = useMemo(() => {
    let data;
    if (ActiveToken === 1) {
      data = TimeIncometoday.data;
    } else {
      data = MatterIncometoday.data;
    }
    if (!data) {
      data = [];
    }
    return data;
  }, [TimeIncometoday, MatterIncometoday, ActiveToken]);

  const LoadStatus = useMemo(() => {
    let Status;
    if (ActiveToken === 1) {
      Status = TimeIncometoday.loadStatus;
    } else {
      Status = MatterIncometoday.loadStatus;
    }
    return Status;
  }, [TimeIncometoday, MatterIncometoday, ActiveToken]);

  const getMyBalance = async () => {
    for (let i = 0; i < BalanceList.length; i++) {
      if (BalanceList[i].token_type === 1 && activeToken === 'TIME') {
        setWalletInfo(BalanceList[i]);
      }
      if (BalanceList[i].token_type === 2 && activeToken === 'MATTER') {
        setWalletInfo(BalanceList[i]);
      }
    }
  };

  useEffect(() => {
    if (activeToken === 'TIME') {
      setTokenWithDrawMinNum(WithDrawMinNum.time_minimum);
    } else {
      setTokenWithDrawMinNum(WithDrawMinNum.meta_minimum);
    }
  }, [WithDrawMinNum, activeToken]);
  useEffect(() => {
    const getTokenType = () => {
      // 获取路由的token参数
      const { search } = route?.location || {};
      const myQuery = search => {
        return new URLSearchParams(search);
      };
      const TokenType = myQuery(search).get('token');
      if (TokenType) {
        setActiveToken(Number(TokenType));
      }
    };
    getTokenType();
  }, []);
  useEffect(() => {
    if (account) {
      if (activeToken === 'TIME') {
        setwalletBalance(getBalanceAmount(timeBalance).toString());
        settokenAddress(timeAddress);
      } else {
        setwalletBalance(getBalanceAmount(matterBalance).toString());
        settokenAddress(MatterAddress);
      }
    }
    return () => {
      setwalletBalance('0');
    };
  }, [
    account,
    matterBalance,
    timeBalance,
    timeAddress,
    MatterAddress,
    activeToken,
  ]);

  useEffect(() => {
    account && BalanceList.length > 1 && getMyBalance();
    return () => {
      setWalletInfo(info);
    };
  }, [BalanceList, account, activeToken]);

  useEffect(() => {
    if (ActiveToken === 1) {
      dispatch(fetchTimeIncometoday({ day }));
      dispatch(fetchIncomeList({ page: 1, pageSize, readType }));
    } else {
      dispatch(fetchMatterIncometoday({ day }));
      dispatch(fetchMatterIncomeList({ page: 1, pageSize }));
    }
  }, [ActiveToken]);

  return (
    <NoPdBottom>
      <Flex flexWrap='wrap' justifyContent='space-between'>
        <BorderWalletBox
          BalanceInfo={WalletInfo}
          Token={activeToken}
          Balance={walletBalance}
          TokenAddr={tokenAddress}
          TokenWithDrawMinNum={TokenWithDrawMinNum}
        />
        {!isMobile && (
          <Recharge
            Token={activeToken}
            balance={walletBalance}
            TokenAddr={tokenAddress}
          />
        )}
      </Flex>
      {/* token切换 */}
      <ContentTab>
        <Flex alignItems='baseline'>
          <TabText
            className={ActiveToken === 1 ? 'active' : ''}
            onClick={() => setActiveToken(1)}
          >
            TIME {t('Time Rewards')}
          </TabText>
          <TabText
            className={ActiveToken === 2 ? 'active' : ''}
            onClick={() => setActiveToken(2)}
          >
            MATTER {t('Time Rewards')}
          </TabText>
        </Flex>
        {!isMobile && (
          <IncomeComp
            isMobile={isMobile}
            TodayIncome={TodayIncome}
            TotalIncome={TotalIncome}
          />
        )}
      </ContentTab>
      {isMobile && (
        <ContentTab>
          <IncomeComp
            isMobile={isMobile}
            TodayIncome={TodayIncome}
            TotalIncome={TotalIncome}
          />
        </ContentTab>
      )}
      <Chart type={ActiveToken} chartData={ChartList} load={LoadStatus} />
      {ActiveToken === 1 && (
        <PostTab>
          <Flex alignItems='baseline'>
            <TabText
              className={readType === 1 ? 'active' : ''}
              onClick={() => {
                setreadType(1);
                dispatch(fetchIncomeList({ page: 1, pageSize, readType: 1 }));
              }}
            >
              {t('walletePost')}
            </TabText>
            <TabText
              className={readType === 2 ? 'active' : ''}
              onClick={() => {
                setreadType(2);
                dispatch(fetchIncomeList({ page: 1, pageSize, readType: 2 }));
              }}
            >
              {t('walleteComment')}
            </TabText>
          </Flex>
        </PostTab>
      )}
      <EarningsRecord
        readType={readType}
        type={ActiveToken}
        info={ActiveToken === 1 ? ContentHistoryInfo : TaskHistoryinfo}
      />
    </NoPdBottom>
  );
});

export default TokenAccount;
