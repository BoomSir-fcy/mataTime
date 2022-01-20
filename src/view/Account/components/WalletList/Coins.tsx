import React, { useState, useCallback, useEffect } from 'react';
import { Flex, Box, Text, Button, Spinner, Image } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { storeAction, useStore } from 'store';
import history from 'routerHistory';
import { HeadBox, info } from '.';
import { getToken } from 'view/Account/hooks/walletInfo';
import { ConnectWalletButton, ModalWrapper } from 'components';
import RechargeOrWithdrawPop from '../TokenAccount/Pops/RechargeOrWithdrawPop';
import HistoryModal from '../TokenAccount/Pops/HistoryModal';
import useMenuNav from 'hooks/useMenuNav';
import QuestionHelper from 'components/QuestionHelper';
import BigNumber from 'bignumber.js';

const ContentBox = styled(Box)`
  color: ${({ theme }) => theme.colors.white_black};
  cursor: pointer;
`;
const IconToken = styled(Image)`
  margin-right: 15px;
  min-width: 40px;
`;
const BtnBox = styled(Box)`
  width: 50%;
`;

const TextBtn = styled(Button)`
  color: ${({ theme }) => theme.colors.textPrimary};
  display: block;
  padding-left: 0;
  position: relative;
  &:hover {
    text-decoration: underline;
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.textTips};
    cursor: no-drop;
  }
`;

const Helper = styled(QuestionHelper)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const ConnectWalletBtnStyle = styled(ConnectWalletButton)`
  width: 100%;
`;

interface init {
  BalanceList: info[];
  TokenInfo: info;
  Balance: string;
  TokenWithDrawFee: string;
  TokenWithDrawMinNum: string;
  WithDrawFeeType: number;
  BnbAvailableBalance: string;
}
const Coins: React.FC<init> = ({
  BalanceList,
  TokenInfo,
  TokenWithDrawMinNum,
  Balance,
  TokenWithDrawFee,
  WithDrawFeeType,
  BnbAvailableBalance,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [ModalTitle, setModalTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleHistory, setVisibleHistory] = useState(false);
  const [ChosenType, setChosenType] = useState(1);
  const { isMobile } = useMenuNav();
  const WithDrawSetting = useStore(p => p.wallet.WithDrawSetting);

  const openModaal = title => {
    dispatch(
      storeAction.changeChoiceToken({ choiceToken: TokenInfo.token_type }),
    );
    setChosenType(title);
    setVisible(true);
  };
  const onClose = useCallback(() => setVisible(false), [setVisible]);

  const Token = getToken(TokenInfo.token_type).toString();

  useEffect(() => {
    const titleText =
      ChosenType === 1 ? t('AccountRecharge') : t('Accountwithdraw');
    setModalTitle(`${titleText} ${Token}`);
  }, [ChosenType, Token]);

  return (
    <ContentBox>
      <HeadBox
        style={{ display: 'grid' }}
        onClick={() => {
          history.push(`/account?token=${TokenInfo.token_type}`);
        }}
      >
        <LogoCom Token={Token} />
        {!isMobile ? (
          <>
            <Text fontSize='14px' paddingRight='10px' ellipsis>
              {TokenInfo.total_balance}
            </Text>
            <Text fontSize='14px' paddingRight='10px' ellipsis>
              {TokenInfo.freeze_balance}
            </Text>
            <Text fontSize='14px' paddingRight='10px' ellipsis>
              {TokenInfo.available_balance}
            </Text>
            {account ? (
              <Flex flexWrap='wrap' justifyContent='center'>
                <BtnBox>
                  <TextBtn
                    variant='text'
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      openModaal(1);
                    }}
                  >
                    {t('AccountRecharge')}
                  </TextBtn>
                  {TokenInfo.token_type !== 3 && (
                    <TextBtn
                      variant='text'
                      disabled={TokenInfo.token_type === 2}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (TokenInfo.token_type === 1) {
                          history.push('/account/time');
                        }
                      }}
                    >
                      {t('Time Exchange')}
                      {TokenInfo.token_type === 2 && (
                        <Helper
                          text={
                            <>
                              <Text fontSize='14px'>{t('Not yet open')}</Text>
                            </>
                          }
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          iconWidth='80px'
                          iconHeight='30px'
                          placement='top-end'
                          color='transparent'
                        />
                      )}
                    </TextBtn>
                  )}
                </BtnBox>
                <BtnBox>
                  <TextBtn
                    variant='text'
                    disabled={
                      Token === 'MATTER' &&
                      new BigNumber(TokenInfo.available_balance).isLessThan(
                        WithDrawSetting.meta_minimum,
                      )
                    }
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      openModaal(2);
                    }}
                  >
                    {t('Accountwithdraw')}
                    {Token === 'MATTER' &&
                      new BigNumber(TokenInfo.available_balance).isLessThan(
                        WithDrawSetting.meta_minimum,
                      ) && (
                        <Helper
                          text={
                            <>
                              <Text fontSize='14px'>
                                {t(
                                  'Account Over %num% can be withdrawn to the wallet on the chain',
                                  { num: TokenWithDrawMinNum },
                                )}
                              </Text>
                            </>
                          }
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          iconWidth='80px'
                          iconHeight='30px'
                          placement='top-end'
                          color='transparent'
                        />
                      )}
                  </TextBtn>
                  <TextBtn
                    variant='text'
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(
                        storeAction.changeChoiceToken({
                          choiceToken: TokenInfo.token_type,
                        }),
                      );
                      setVisibleHistory(true);
                    }}
                  >
                    {t('Account history record')}
                  </TextBtn>
                </BtnBox>
              </Flex>
            ) : (
              <ConnectWalletBtnStyle />
            )}
          </>
        ) : (
          <Box style={{ textAlign: 'right' }}>
            <Text fontSize='14px' color='textTips' ellipsis>
              {t('Account Wallet Balance')}
            </Text>
            <Text fontSize='20px' bold ellipsis>
              {TokenInfo.total_balance}
            </Text>
          </Box>
        )}
      </HeadBox>
      {/* 输入框弹窗 */}
      <ModalWrapper
        title={ModalTitle}
        creactOnUse
        visible={visible}
        setVisible={setVisible}
        overflow='visible'
      >
        <RechargeOrWithdrawPop
          onClose={onClose}
          // TokenAddr={TokenInfo.tokenAddress}
          type={ChosenType}
          setChosenType={type => setChosenType(type)}
          // tokenType={TokenInfo.token_type}
          // token={Token}
          balance={Balance}
          // withdrawalBalance={TokenInfo.available_balance}
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
        <HistoryModal token={TokenInfo.token_type} />
      </ModalWrapper>
    </ContentBox>
  );
};

const LogoCom = ({ Token }) => {
  return (
    <Flex alignItems='center'>
      <IconToken
        src={`/images/tokens/${Token}.svg`}
        width={40}
        height={40}
        alt=''
      />
      <Text bold fontSize='18px'>
        {Token}
      </Text>
    </Flex>
  );
};

export default Coins;
