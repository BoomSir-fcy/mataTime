import React, { useState, useEffect, useMemo } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components';
import { RouteComponentProps, useLocation } from 'react-router-dom';
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
import { storeAction, useStore } from 'store';
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
import { useGetBnbBalance, useTokenBalance } from 'hooks/useTokenBalance';
import { useInviteCount } from 'view/Task/hooks/matter';
import { Icon } from 'components';
import FriendsList from 'view/Task/components/FriendsList';
import WalletList from '../WalletList';
import { getToken } from 'view/Account/hooks/walletInfo';

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
  min-width: 20vw;
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
      {/* <IncomeBox>
        <Icon size={size} color='white_black' name='icon-zhifeiji1' />
        <Flex ml='12px' flexDirection='column' justifyContent='space-between'>
          <Text fontSize='14px' color='textTips'>
            {t('My Rebate(TIME)')}
          </Text>
          <Text color='white_black' fontWeight='bold'>
            {inviteInfo.total_rebate}
          </Text>
        </Flex>
      </IncomeBox> */}
      <IncomeBox>
        <Icon size={size} color='white_black' name='icon-leijishouyi' />
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
        <Icon size={size} color='white_black' name='icon-zongshouyi' />
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

const TokenAccount: React.FC = () => {
  useFetchWalletInfo();
  useFetchApproveNum();
  useFetchMinimum();
  const { search } = useLocation();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { isMobile } = useMenuNav();
  const [WalletInfo, setWalletInfo] = useState({
    address: '',
    available_balance: '0',
    freeze_balance: '0',
    token_type: 1,
    total_balance: '0',
    uid: 0,
  });
  const [TokenInfo, setTokenInfo] = useState([
    {
      address: '',
      available_balance: '0',
      freeze_balance: '0',
      token_type: 0,
      total_balance: '0',
      uid: 0,
      tokenAddress: '',
    },
  ]);
  const [walletBalance, setwalletBalance] = useState('0');
  const [tokenAddress, settokenAddress] = useState('');
  const [ActiveToken, setActiveToken] = useState(0);
  const [pageSize, setpageSize] = useState(5);
  const [day, setday] = useState(7);
  const [readType, setreadType] = useState(1);
  const [TokenWithDrawMinNum, setTokenWithDrawMinNum] = useState('0');
  const [TokenWithDrawFee, setTokenWithDrawFee] = useState('0');
  const [BnbAvailableBalance, setBnbAvailableBalance] = useState('0');
  const timeAddress = getTimeAddress();
  const MatterAddress = getMatterAddress();
  const { balance: timeBalance } = useTokenBalance(timeAddress);
  const { balance: matterBalance } = useTokenBalance(MatterAddress);
  const { balance: bnbBalance } = useGetBnbBalance();
  const BalanceList = useStore(p => p.wallet.wallet);
  const activeToken = useStore(p => p.wallet.activeToken);
  const TimeIncometoday = useStore(p => p.wallet.TimeIncometoday);
  const MatterIncometoday = useStore(p => p.wallet.MatterIncometoday);
  const ContentHistoryInfo = useStore(p => p.wallet.TimeIncomeList);
  const TaskHistoryinfo = useStore(p => p.wallet.MatterIncomeList);
  const WithDrawSetting = useStore(p => p.wallet.WithDrawSetting);
  const WithDrawFeeType = useStore(p => p.wallet.WithDrawFeeType);
  const ChoiceToken = useStore(p => p.wallet.choiceToken);

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
    let list;
    if (ActiveToken === 1) {
      list = TimeIncometoday.data;
    } else {
      list = MatterIncometoday.data;
    }
    if (!list) {
      list = [];
    }
    return list;
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

  useEffect(() => {
    // 最小提币数量和手续费
    if (activeToken === 'TIME' || ChoiceToken === 1) {
      setTokenWithDrawMinNum(WithDrawSetting.time_minimum);
      if (WithDrawFeeType === 1) {
        setTokenWithDrawFee(WithDrawSetting?.withdraw_bnb_fee);
      } else {
        setTokenWithDrawFee(WithDrawSetting?.withdraw_time_fee);
      }
    } else if (activeToken === 'MATTER' || ChoiceToken === 2) {
      setTokenWithDrawMinNum(WithDrawSetting.meta_minimum);
      if (WithDrawFeeType === 1) {
        setTokenWithDrawFee(WithDrawSetting?.withdraw_bnb_fee);
      } else {
        setTokenWithDrawFee(WithDrawSetting?.withdraw_meta_fee);
      }
    } else if (activeToken === 'BNB' || ChoiceToken === 3) {
      setTokenWithDrawMinNum(WithDrawSetting.bnb_minimum);
      setTokenWithDrawFee(WithDrawSetting?.withdraw_bnb_fee);
    }
  }, [WithDrawFeeType, WithDrawSetting, activeToken, ChoiceToken]);

  useEffect(() => {
    // 获取路由的token参数
    const getTokenType = () => {
      const myQuery = search => {
        return new URLSearchParams(search);
      };
      const TokenType = myQuery(search).get('token');
      if (TokenType) {
        dispatch(
          storeAction.changeChoiceToken({ choiceToken: Number(TokenType) }),
        );
        setActiveToken(Number(TokenType));
        const Tk = getToken(Number(TokenType));
        dispatch(storeAction.changeActiveToken({ activeToken: String(Tk) }));
      } else {
        dispatch(storeAction.changeActiveToken({ activeToken: '' }));
      }
      // 列表type
      const MyreadType = myQuery(search).get('readType');
      if (MyreadType) {
        setreadType(Number(MyreadType));
      }
    };
    getTokenType();
  }, [search, dispatch]);

  useEffect(() => {
    // 获取代币余额
    if (account) {
      if (activeToken === 'TIME' || ChoiceToken === 1) {
        setwalletBalance(getBalanceAmount(timeBalance).toString());
        settokenAddress(timeAddress);
      } else if (activeToken === 'MATTER' || ChoiceToken === 2) {
        setwalletBalance(getBalanceAmount(matterBalance).toString());
        settokenAddress(MatterAddress);
      } else if (activeToken === 'BNB' || ChoiceToken === 3) {
        setwalletBalance(getBalanceAmount(bnbBalance).toString());
        settokenAddress('');
      }
    }
    return () => {
      setwalletBalance('0');
    };
  }, [
    bnbBalance,
    account,
    matterBalance,
    timeBalance,
    timeAddress,
    MatterAddress,
    activeToken,
    ChoiceToken,
  ]);

  useEffect(() => {
    const getMyBalance = async () => {
      // 显示币种详情
      let List = [];
      for (let i = 0; i < BalanceList.length; i++) {
        if (BalanceList[i].token_type === 1) {
          List[i] = { ...BalanceList[i], tokenAddress: timeAddress };
          setTokenInfo(List);
          if (activeToken === 'TIME') setWalletInfo(BalanceList[i]);
        }
        if (BalanceList[i].token_type === 2) {
          List[i] = { ...BalanceList[i], tokenAddress: MatterAddress };
          setTokenInfo(List);
          if (activeToken === 'MATTER') setWalletInfo(BalanceList[i]);
        }
        if (BalanceList[i].token_type === 3) {
          List[i] = { ...BalanceList[i] };
          setTokenInfo(List);
          if (activeToken === 'BNB') setWalletInfo(BalanceList[i]);
          setBnbAvailableBalance(BalanceList[i].available_balance);
        }
      }
    };
    BalanceList.length > 1 && getMyBalance();
    const Tk = getToken(activeToken);
    setActiveToken(Number(Tk));
    return () => {
      setWalletInfo({
        address: '',
        available_balance: '0',
        freeze_balance: '0',
        token_type: 1,
        total_balance: '0',
        uid: 0,
      });
    };
  }, [
    BalanceList,
    account,
    timeAddress,
    MatterAddress,
    setTokenInfo,
    setWalletInfo,
    activeToken,
  ]);

  useEffect(() => {
    if (ActiveToken === 1) {
      dispatch(fetchTimeIncometoday({ day }));
      dispatch(fetchIncomeList({ page: 1, pageSize, readType }));
    } else if (ActiveToken === 2) {
      dispatch(fetchMatterIncometoday({ day }));
      dispatch(fetchMatterIncomeList({ page: 1, pageSize }));
    }
  }, [ActiveToken, day, dispatch, pageSize, readType]);

  return (
    <NoPdBottom>
      {Boolean(activeToken) ? (
        <>
          <Flex flexWrap='wrap' justifyContent='space-between'>
            <BorderWalletBox
              BalanceList={TokenInfo}
              BalanceInfo={WalletInfo}
              Token={activeToken}
              Balance={walletBalance}
              TokenAddr={tokenAddress}
              TokenWithDrawMinNum={TokenWithDrawMinNum}
              TokenWithDrawFee={TokenWithDrawFee}
              WithDrawFeeType={WithDrawFeeType}
              BnbAvailableBalance={BnbAvailableBalance}
            />
            {/* {!isMobile && (
            <Recharge
              Token={activeToken}
              balance={walletBalance}
              TokenAddr={tokenAddress}
            />
          )} */}
          </Flex>
          {WalletInfo.token_type !== 3 && (
            <>
              {/* token切换 */}
              <ContentTab>
                <Text className='active'>
                  {activeToken} {t('Time Rewards')}
                </Text>
                {/* <Flex alignItems='baseline'>
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
            </Flex> */}
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
              <Chart
                type={ActiveToken}
                chartData={ChartList}
                load={LoadStatus}
              />
              {ActiveToken === 1 && (
                <PostTab>
                  <Flex alignItems='baseline'>
                    <TabText
                      className={readType === 1 ? 'active' : ''}
                      onClick={() => {
                        setreadType(1);
                        dispatch(
                          fetchIncomeList({ page: 1, pageSize, readType: 1 }),
                        );
                      }}
                    >
                      {t('walletePost')}
                    </TabText>
                    <TabText
                      className={readType === 2 ? 'active' : ''}
                      onClick={() => {
                        setreadType(2);
                        dispatch(
                          fetchIncomeList({ page: 1, pageSize, readType: 2 }),
                        );
                      }}
                    >
                      {t('walleteComment')}
                    </TabText>
                    <TabText
                      className={readType === 3 ? 'active' : ''}
                      onClick={() => {
                        setreadType(3);
                      }}
                    >
                      {t('My Rebate')}
                    </TabText>
                  </Flex>
                </PostTab>
              )}
              {readType === 3 && ActiveToken === 1 ? (
                <FriendsList showTitle={false} />
              ) : (
                <EarningsRecord
                  readType={readType}
                  type={ActiveToken}
                  info={
                    ActiveToken === 1 ? ContentHistoryInfo : TaskHistoryinfo
                  }
                />
              )}
            </>
          )}
        </>
      ) : (
        <WalletList
          BalanceList={TokenInfo}
          Balance={walletBalance}
          TokenWithDrawMinNum={TokenWithDrawMinNum}
          TokenWithDrawFee={TokenWithDrawFee}
          WithDrawFeeType={WithDrawFeeType}
          BnbAvailableBalance={BnbAvailableBalance}
        />
      )}
    </NoPdBottom>
  );
};

export default TokenAccount;
