/* eslint-disable */
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Flex, Box, Text, Button, InputPanel, Input, Image } from 'uikit';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { BIG_TEN } from 'utils/bigNumber';
import { formatDisplayApr } from 'utils/formatBalance';
import { formatDisplayBalanceWithSymbol } from 'utils/formatBalance';
import { getToken, useDpWd } from '../../../hooks/walletInfo';
import Dots from 'components/Loader/Dots';
import { storeAction, useStore } from 'store';
import { fetchApproveNumAsync, fetchWalletAsync } from 'store/wallet/reducer';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization';
import { DropDown, Icon } from 'components';
import { info } from '../../WalletList';
import QuestionHelper from 'components/QuestionHelper';

const CountBox = styled(Box)`
  width: 88vw;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 410px;
  }
`;
const InputBox = styled(Flex)`
  position: relative;
  align-items: center;
`;
const Max = styled(Text)`
  position: absolute;
  right: 15px;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  font-size: 14px;
`;
const SureBtn = styled(Button)`
  padding: 6px 30px;
  width: 60%;
`;
const MyInput = styled(Input)`
  border-radius: 10px;
  padding: 12px 50px 12px 16px;
  height: 50px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`;
const IconToken = styled(Image)`
  margin-right: 12px;
  min-width: 25px;
`;
const ArrowIcon = styled(Icon)<{ open: boolean }>`
  transition: all 0.3s;
  transform: ${({ open }) => (open ? 'rotateZ(270deg)' : 'rotateZ(90deg)')};
  transform-origin: center;
`;
const RowsToken = styled(Flex)`
  align-items: center;
  padding: 10px;
`;
const TipsBox = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;
const TipsText = styled(Text)`
  font-size: 14px;
`;

// type 1 充值 2 提币
interface init {
  BalanceList: info[];
  type: number;
  setChosenType: (type) => void;
  balance: string;
  // tokenType: number;
  // token: string;
  // TokenAddr: string;
  onClose: () => void;
  // withdrawalBalance: string;
  decimals?: number;
  TokenWithDrawMinNum: string;
  TokenWithDrawFee: string;
  WithDrawFeeType: number;
  BnbAvailableBalance: string;
}

const MoneyModal: React.FC<init> = ({
  BalanceList,
  type,
  balance,
  setChosenType,
  // tokenType,
  // token,
  // TokenAddr,
  onClose,
  // withdrawalBalance,
  decimals = 18,
  TokenWithDrawMinNum,
  TokenWithDrawFee,
  WithDrawFeeType,
  BnbAvailableBalance,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [val, setVal] = useState('');
  const [ActiveTokenInfo, setActiveTokenInfo] = useState<info>();
  const [withdrawalBalance, setwithdrawalBalance] = useState('0');
  const [Token, setToken] = useState('');
  const [approvedNum, setapprovedNum] = useState(0);
  const { drawCallback, Recharge, onApprove } = useDpWd();
  const [pending, setpending] = useState(false);
  const [open, setOpen] = useState(false);
  const { time: TimeApprovedNum, matter: MatterApprovedNum } = useStore(
    p => p.wallet.ApproveNum,
  );
  const ChoiceToken = useStore(p => p.wallet.choiceToken);
  const activeToken = useStore(p => p.wallet.activeToken);

  const Balance_after_withdraw = useMemo(() => {
    let InputVal = val ? val : 0;
    const overBalance = new BigNumber(withdrawalBalance)
      .minus(InputVal)
      .toString();
    return overBalance;
  }, [val, withdrawalBalance]);

  // 充值/提现
  const handSure = useCallback(async () => {
    setpending(true);
    if (type === 1) {
      // 充值
      if (balance === '0') {
        setpending(false);
        return;
      }
      if (new BigNumber(val).isLessThanOrEqualTo(0)) {
        setpending(false);
        return;
      }
      const addPrecisionNum = new BigNumber(val)
        .times(BIG_TEN.pow(18))
        .toString();
      try {
        let isChainToken = false;
        if (Token === 'BNB') {
          isChainToken = true;
        }
        await Recharge(
          ActiveTokenInfo.tokenAddress,
          addPrecisionNum,
          isChainToken,
        );
        toast.success(t('Account The transaction is successful!'));
        onClose();
      } catch (e) {
        console.error(e);
        toast.error(t('Account Deposit failed!'));
      } finally {
        setpending(false);
      }
    } else {
      // 提现
      // 判断手续费是否够
      if (WithDrawFeeType === 1) {
        if (new BigNumber(BnbAvailableBalance).isLessThan(TokenWithDrawFee)) {
          toast.error(t('Insufficient withdrawal fee!'));
          setpending(false);
          return;
        }
      }

      if (Number(withdrawalBalance) === 0) {
        setpending(false);
        return;
      }
      if (new BigNumber(val).isLessThanOrEqualTo(0)) {
        setpending(false);
        return;
      }
      if (new BigNumber(val).isLessThan(TokenWithDrawMinNum)) {
        toast.error(
          t('Account Minimum withdrawal amount %amount%', {
            amount: TokenWithDrawMinNum,
          }),
        );
        setpending(false);
        return;
      }
      try {
        await drawCallback(
          val,
          ActiveTokenInfo.tokenAddress,
          ActiveTokenInfo.token_type,
        );
        toast.success(t('Account The transaction is successful!'));
        onClose();
      } catch (e) {
        console.error(e);
        toast.error(t('Account Withdrawal failed!'));
      } finally {
        setpending(false);
      }
    }
    dispatch(fetchWalletAsync());
  }, [Recharge, type, balance, withdrawalBalance, ActiveTokenInfo, Token, val]);
  // 授权
  const handleApprove = useCallback(async () => {
    setpending(true);
    try {
      await onApprove(Token);
      toast.success(t('setNftAuthorizationSuccess'));
    } catch (e) {
      console.error(e);
      toast.error(t('setNftAuthorizationFail'));
    } finally {
      setpending(false);
      dispatch(fetchApproveNumAsync(account));
    }
  }, [onApprove, account, Token]);
  // 输入框输入限制
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const chkPrice = val => {
        val = val.replace(/,/g, '.');
        if (
          new BigNumber(val).isGreaterThan(
            type === 1 ? balance : withdrawalBalance,
          )
        ) {
          return type === 1 ? balance : withdrawalBalance;
        }
        return val;
      };
      if (e.currentTarget.validity.valid) {
        setVal(chkPrice(e.currentTarget.value));
      }
    },
    [setVal, balance, withdrawalBalance],
  );
  // 切换币种
  const changeCoinChecked = async (token: number) => {
    dispatch(storeAction.changeChoiceToken({ choiceToken: token }));
    if (activeToken) {
      const Tk = getToken(token);
      dispatch(storeAction.changeActiveToken({ activeToken: String(Tk) }));
    }
  };

  useEffect(() => {
    const TokenInfo = BalanceList.filter(item => {
      return item.token_type === ChoiceToken;
    });
    const obj = TokenInfo[0];
    setActiveTokenInfo(obj);
    if (obj.token_type === 1) {
      setapprovedNum(TimeApprovedNum);
    } else if (obj.token_type === 2) {
      setapprovedNum(MatterApprovedNum);
    } else {
      setapprovedNum(1);
    }
    setwithdrawalBalance(obj.available_balance);
    const token = getToken(obj.token_type);
    setToken(String(token));
    setVal('');
  }, [ChoiceToken, BalanceList]);
  return (
    <CountBox>
      <Flex justifyContent='space-between' alignItems='center' mb='12px'>
        <Box width='130px'>
          <Flex
            alignItems='center'
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              setOpen(!open);
            }}
            width='130px'
          >
            <CoinItem token={Token} />
            <ArrowIcon
              open={open}
              size={12}
              color='white_black'
              current={1}
              name='icon-shangjiantou'
            />
          </Flex>
          <DropDown fillWidth isOpen={open} scale='ld' setIsOpen={setOpen}>
            {BalanceList.map((item, index) => (
              <RowsToken
                key={index}
                onClick={() => changeCoinChecked(item.token_type)}
              >
                <CoinItem token={getToken(item.token_type)} />
              </RowsToken>
            ))}
          </DropDown>
        </Box>
        <Text fontSize='14px' color='textTips'>
          {t('Account Available Balance')}:{' '}
          {formatDisplayBalanceWithSymbol(
            type === 1
              ? new BigNumber(balance)
              : new BigNumber(withdrawalBalance),
            0,
          )}
        </Text>
      </Flex>
      <InputBox mb='10px'>
        <MyInput
          disabled={approvedNum === 0}
          noShadow
          pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
          inputMode='decimal'
          value={val}
          onChange={handleChange}
          placeholder={
            type === 1
              ? t('Account Please enter the recharge amount')
              : t('Account Please enter the withdrawal amount')
          }
        />
        <Max
          style={
            (type === 1 && approvedNum === 0) || approvedNum === 0
              ? { cursor: 'no-drop' }
              : {}
          }
          onClick={() => {
            if ((type === 1 && approvedNum === 0) || approvedNum === 0) return;
            setVal(String(type === 1 ? balance : withdrawalBalance));
          }}
        >
          MAX
        </Max>
      </InputBox>
      {type === 2 ? (
        <>
          <TipsBox>
            <Flex alignItems='center'>
              <TipsText color='textTips'>
                {t('Account Withdrawal Fee')}
              </TipsText>
              <QuestionHelper
                text={
                  <>
                    <Text fontSize='14px'>
                      {t('Estimated value, based on the chain')}
                    </Text>
                  </>
                }
                iconWidth='14px'
                ml='4px'
                placement='top-start'
                style={{ cursor: 'pointer' }}
              />
            </Flex>
            <TipsText color='white_black'>
              {TokenWithDrawFee}&nbsp;
              {WithDrawFeeType === 1 && `BNB`}
            </TipsText>
          </TipsBox>
          <TipsBox>
            <TipsText color='textTips'>{t('Balance after withdraw')}</TipsText>
            <TipsText color='white_black'>
              {Balance_after_withdraw}&nbsp;
              {Token}
            </TipsText>
          </TipsBox>
          {WithDrawFeeType === 1 &&
            new BigNumber(BnbAvailableBalance).isLessThan(TokenWithDrawFee) && (
              <Flex mb='14px' paddingTop='10px' alignItems='center'>
                <Text fontSize='14px' color='textOrigin'>
                  {t('Don_t have enough BNB, please')}
                </Text>
                &nbsp;
                <Text
                  style={{ cursor: 'pointer' }}
                  fontSize='14px'
                  color='textPrimary'
                  onClick={() => {
                    if (activeToken) {
                      dispatch(
                        storeAction.changeActiveToken({ activeToken: 'BNB' }),
                      );
                    }
                    setChosenType(1);
                    changeCoinChecked(3);
                  }}
                >
                  {t('AccountRecharge')}
                  {`>`}
                </Text>
              </Flex>
            )}
        </>
      ) : (
        <TipsText mb='14px' color='textTips'>
          {t(
            'Deposit BNB as withdrawal fee，you can withdraw it  at any time.',
          )}
        </TipsText>
      )}
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <SureBtn
          mb='10px'
          disable={pending}
          onClick={() => {
            if (approvedNum > 0) {
              // 充值、提现
              handSure();
            } else {
              // 授权
              handleApprove();
            }
          }}
        >
          {type === 1 ? (
            pending ? (
              <Dots>
                {approvedNum > 0
                  ? t('Account Trading')
                  : t('Account Approving')}
              </Dots>
            ) : approvedNum > 0 ? (
              t('Account Confirm')
            ) : (
              t('Account Approve')
            )
          ) : pending ? (
            <Dots>
              {approvedNum > 0 ? t('Account Trading') : t('Account Approving')}
            </Dots>
          ) : approvedNum > 0 ? (
            t('Account Confirm')
          ) : (
            t('Account Approve')
          )}
        </SureBtn>
        <Text fontSize='14px' color='textTips'>
          {t('Account Please confirm the transaction in Token')}
        </Text>
      </Flex>
    </CountBox>
  );
};
const CoinItem = ({ token }) => {
  return (
    <>
      <IconToken
        src={`/images/tokens/${token}.svg`}
        width={25}
        height={25}
        alt=''
      />
      <Text bold fontSize='18px' mr='14px'>
        {token}
      </Text>
    </>
  );
};
export default MoneyModal;
