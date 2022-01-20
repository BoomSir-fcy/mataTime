import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Flex, Box, Text, Image, Button, Heading, CloseLineIcon } from 'uikit';
import styled from 'styled-components';
import history from 'routerHistory';
import { useWeb3React } from '@web3-react/core';
import { ConnectWalletButton, ModalWrapper, Icon } from 'components';
import RechargeOrWithdrawPop from './Pops/RechargeOrWithdrawPop';
import {
  formatDisplayApr,
  formatDisplayBalanceWithSymbol,
} from 'utils/formatBalance';
import { useTranslation } from 'contexts/Localization';
import walletBg from 'assets/images/myWallet/wallet.png';
import walletBg_w from 'assets/images/myWallet/wallet_w.png';
import { useStore, storeAction } from 'store';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEstimatedServiceTime } from 'store/wallet/hooks';
import useMenuNav from 'hooks/useMenuNav';
import HistoryModal from './Pops/HistoryModal';
import BigNumber from 'bignumber.js';
import { info } from '../WalletList';

const Content = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 300px;
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;
const TopInfo = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0;
    align-items: end;
    flex-direction: column;
    justify-content: flex-end;
  }
  height: 100%;
`;
const IconToken = styled(Image)`
  margin-right: 30px;
  min-width: 43px;
`;
const LeftBox = styled(Flex)`
  min-height: 86px;
  flex-direction: column;
  justify-content: space-between;
`;
const NumText = styled(Text)`
  /* color: ${({ theme }) => theme.colors.textPrimary}; */
  font-weight: bold;
`;

const Fount = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
  min-width: 110px;
`;
const WithdrawBtn = styled(Button)`
  min-width: 80px;
  margin-right: 4px;
  margin-top: 20px;
  width: max-content;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 20px;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.backgroundDisabled};
  }
`;
const ChangeTokenBtn = styled(Flex)`
  cursor: pointer;
`;

const LogoBox = styled(Flex)`
  ${({ theme }) => theme.mediaQueriesSize.marginr}
`;

interface Wallet {
  BalanceList: info[];
  Token: string;
  Balance: string;
  TokenAddr: string;
  BalanceInfo: Api.Account.Balance;
  TokenWithDrawMinNum: string;
  TokenWithDrawFee: string;
  WithDrawFeeType: number;
  BnbAvailableBalance: string;
}
const WalletBox: React.FC<Wallet> = ({
  BalanceList,
  Token,
  Balance,
  TokenAddr,
  BalanceInfo,
  TokenWithDrawMinNum,
  TokenWithDrawFee,
  WithDrawFeeType,
  BnbAvailableBalance,
  ...props
}) => {
  const size = 20;
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { isPushed, setIsPushed, isMobile } = useMenuNav();

  const [visibleHistory, setVisibleHistory] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ModalTitle, setModalTitle] = useState('');
  const [ChosenType, setChosenType] = useState(1);
  const leftTime = useEstimatedServiceTime();

  const ReleaseTime = useMemo(() => {
    dayjs.extend(duration);
    const num = dayjs.duration(leftTime, 'seconds').humanize();
    return num;
  }, [leftTime]);

  const openModaal = title => {
    setChosenType(title);
    setVisible(true);
  };
  const onClose = useCallback(() => setVisible(false), [setVisible]);
  const onChangeToken = useCallback(() => {
    if (Token === 'TIME') {
      dispatch(storeAction.changeActiveToken({ activeToken: 'MATTER' }));
    } else {
      dispatch(storeAction.changeActiveToken({ activeToken: 'TIME' }));
    }
  }, [Token]);

  useEffect(() => {
    const titleText =
      ChosenType === 1 ? t('AccountRecharge') : t('Accountwithdraw');
    setModalTitle(`${titleText} ${Token}`);
  }, [ChosenType, Token]);

  return (
    <Content {...props}>
      {isMobile && (
        <TopInfo>
          <LogoCom Token={Token} />
          {/* <ChangeTokenBtn alignItems='center' onClick={onChangeToken}>
            <Icon
              size={size}
              color='textPrimary'
              current={1}
              name='icon-qiehuan'
            />
            <NumText ml='12px' fontSize='14px' color='textPrimary'>
              {t('Account %token% Wallet', {
                token: Token === 'TIME' ? 'MATTER' : 'TIME',
              })}
            </NumText>
          </ChangeTokenBtn> */}
          {BalanceInfo.token_type === 1 && (
            <>
              <Flex alignItems='baseline'>
                <Text fontSize='14px' color='textTips' mr='16px'>
                  {t('Account Estimated use of')}
                </Text>
                <NumText>
                  {leftTime > 0
                    ? t('More than %time% hours', { time: ReleaseTime })
                    : 0}
                </NumText>
              </Flex>
            </>
          )}
        </TopInfo>
      )}
      <Flex alignItems='flex-start' justifyContent='space-between'>
        <Flex>
          {!isMobile && <LogoCom Token={Token} />}
          <LeftBox>
            <Flex alignItems='baseline'>
              <Fount mr='16px'>{t('Account Wallet Balance')}</Fount>
              <NumText>
                {BalanceInfo.token_type === 1
                  ? formatDisplayApr(Number(BalanceInfo.total_balance))
                  : formatDisplayBalanceWithSymbol(
                      new BigNumber(BalanceInfo.total_balance),
                      0,
                    )}
              </NumText>
            </Flex>
            {BalanceInfo.token_type !== 2 && (
              <Flex alignItems='baseline'>
                <Fount mr='16px'>{t('Account Available Balance')}</Fount>
                <NumText>
                  {BalanceInfo.token_type === 1
                    ? formatDisplayApr(Number(BalanceInfo.available_balance))
                    : formatDisplayBalanceWithSymbol(
                        new BigNumber(BalanceInfo.available_balance),
                        0,
                      )}
                </NumText>
              </Flex>
            )}
            {BalanceInfo.token_type === 2 ? (
              <Fount>
                {t(
                  'Account Over %num% can be withdrawn to the wallet on the chain',
                  { num: TokenWithDrawMinNum },
                )}
              </Fount>
            ) : (
              <Flex alignItems='baseline'>
                <Fount mr='16px'>{t('Account Frozen amount')}</Fount>
                <NumText>
                  {BalanceInfo.token_type === 1
                    ? formatDisplayApr(Number(BalanceInfo.freeze_balance))
                    : formatDisplayBalanceWithSymbol(
                        new BigNumber(BalanceInfo.freeze_balance),
                        0,
                      )}
                </NumText>
              </Flex>
            )}
          </LeftBox>
        </Flex>
        {!isMobile && (
          <TopInfo>
            {/* <ChangeTokenBtn alignItems='center' onClick={onChangeToken}>
              <Icon
                size={size}
                color='textPrimary'
                current={1}
                name='icon-qiehuan'
              />
              <NumText ml='12px' fontSize='14px' color='textPrimary'>
                {t('Account %token% Wallet', {
                  token: Token === 'TIME' ? 'MATTER' : 'TIME',
                })}
              </NumText>
            </ChangeTokenBtn> */}
            {BalanceInfo.token_type === 1 && (
              <>
                <Flex alignItems='baseline'>
                  <Text fontSize='14px' color='textTips' mr='16px'>
                    {t('Account Estimated use of')}
                  </Text>
                  <NumText>
                    {leftTime > 0
                      ? t('More than %time% hours', { time: ReleaseTime })
                      : 0}
                  </NumText>
                </Flex>
              </>
            )}
            <BtnCom
              t={t}
              account={account}
              openModaal={openModaal}
              Token={Token}
              BalanceInfo={BalanceInfo}
              TokenWithDrawMinNum={TokenWithDrawMinNum}
              setVisibleHistory={setVisibleHistory}
            />
          </TopInfo>
        )}
      </Flex>
      {isMobile && (
        <BtnCom
          t={t}
          account={account}
          openModaal={openModaal}
          Token={Token}
          BalanceInfo={BalanceInfo}
          TokenWithDrawMinNum={TokenWithDrawMinNum}
          setVisibleHistory={setVisibleHistory}
        />
      )}
      {/* 输入框弹窗 */}
      <ModalWrapper
        title={ModalTitle}
        creactOnUse
        visible={visible}
        setVisible={setVisible}
      >
        <RechargeOrWithdrawPop
          onClose={onClose}
          // TokenAddr={TokenAddr}
          type={ChosenType}
          setChosenType={type => setChosenType(type)}
          // tokenType={BalanceInfo.token_type}
          // token={Token}
          balance={Balance}
          // withdrawalBalance={BalanceInfo.available_balance}
          TokenWithDrawMinNum={TokenWithDrawMinNum}
          TokenWithDrawFee={TokenWithDrawFee}
          WithDrawFeeType={WithDrawFeeType}
          BnbAvailableBalance={BnbAvailableBalance}
          BalanceList={BalanceList}
        />
      </ModalWrapper>

      {/* 提币、充值记录 */}
      <ModalWrapper
        title={`${Token} ${t('Account history record')}`}
        creactOnUse
        visible={visibleHistory}
        setVisible={setVisibleHistory}
      >
        <HistoryModal token={BalanceInfo.token_type} />
      </ModalWrapper>
    </Content>
  );
};

const LogoCom = ({ Token }) => {
  return (
    <LogoBox alignItems='flex-start'>
      <IconToken
        src={`/images/tokens/${Token}.svg`}
        width={43}
        height={43}
        alt=''
      />
      <Text fontSize='26px'>{Token}</Text>
    </LogoBox>
  );
};
const BtnCom = ({
  account,
  openModaal,
  t,
  Token,
  BalanceInfo,
  TokenWithDrawMinNum,
  setVisibleHistory,
}) => {
  return (
    <Flex alignItems='center'>
      {account ? (
        <>
          {Token === 'TIME' && (
            <WithdrawBtn
              variant='success'
              onClick={() => {
                history.push('/swap');
              }}
            >
              {t('Buy')} TIME
            </WithdrawBtn>
          )}
          <WithdrawBtn variant='primaryGreen' onClick={() => openModaal(1)}>
            {t('AccountRecharge')}
          </WithdrawBtn>
          <WithdrawBtn
            disabled={
              Token === 'MATTER' &&
              Number(BalanceInfo.available_balance) <
                Number(TokenWithDrawMinNum)
            }
            onClick={() => openModaal(2)}
          >
            {t('Accountwithdraw')}
          </WithdrawBtn>
          <Box mt='20px' width='max-content'>
            <Icon
              size={21}
              color='textPrimary'
              current={1}
              onClick={() => setVisibleHistory(true)}
              name='icon-lishi'
            />
          </Box>
        </>
      ) : (
        <ConnectWalletButton />
      )}
    </Flex>
  );
};

export default WalletBox;
