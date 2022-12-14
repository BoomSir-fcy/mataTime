/* eslint-disable */
import React, { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import { Flex, Box, Text, Input, Button } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import { useDpWd } from '../../hooks/walletInfo';
import { BIG_TEN } from 'utils/bigNumber';
import { toast } from 'react-toastify';
import { fetchApproveNumAsync, fetchWalletAsync } from 'store/wallet/reducer';
import { formatDisplayApr, getFullDisplayBalance } from 'utils/formatBalance';
import Dots from 'components/Loader/Dots';
import { ConnectWalletButton, ModalWrapper } from 'components';
import HistoryModal from './Pops/HistoryModal';

const Content = styled(Box)`
  flex: 1;
  min-width: 52%;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const LeftBox = styled(Flex)`
  min-width: 236px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled(Flex)`
  align-items: center;
`;
const NumberBox = styled(Flex)`
  width: 100px;
  height: 35px;
  background: ${({ theme }) => theme.colors.input};
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 16px;
  margin-right: 16px;
`;
const RightBox = styled(Box)`
  flex: 1;
  min-width: 200px;
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
  width: 100%;
`;
const MyInput = styled(Input)`
  border-radius: 10px;
  padding: 12px 50px 12px 16px;
  height: 50px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  &::placeholder {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textTips};
  }
`;

interface init {
  balance: string;
  TokenAddr: string;
  decimals?: number;
  Token: string;
}

const Recharge: React.FC<init> = ({
  Token,
  balance,
  TokenAddr,
  decimals = 18,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const [val, setVal] = useState('');
  const [visibleHistory, setVisibleHistory] = useState(false);
  const [pending, setpending] = useState(false);
  const [ActiveHistory, setActiveHistory] = useState(1);
  const { Recharge, onApprove } = useDpWd();
  const approvedNum = useStore(p =>
    Token === 'TIME' ? p.wallet.ApproveNum.time : p.wallet.ApproveNum.matter,
  );

  const numberList = ['10000', '20000', '50000', '100000'];

  // ??????
  const handSure = useCallback(async () => {
    setpending(true);
    // ??????
    if (balance === '0') {
      setpending(false);
      return;
    }
    if (Number(val) <= 0) {
      setpending(false);
      return;
    }
    const addPrecisionNum = new BigNumber(val)
      .times(BIG_TEN.pow(18))
      .toString();
    try {
      await Recharge(TokenAddr, addPrecisionNum);
      toast.success(t('Account The transaction is successful!'));
      setVal('');
    } catch (e) {
      console.error(e);
      toast.error(t('Account Deposit failed!'));
    } finally {
      setpending(false);
    }
    dispatch(fetchWalletAsync());
  }, [Recharge, balance, TokenAddr, val]);
  // ??????
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
  // ?????????????????????
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const chkPrice = val => {
        // val = val.replace(/[^\d.]/g, "");
        // //???????????????????????????????????????.
        // val = val.replace(/^\./g, "");
        // //????????????????????????.???????????????.
        // val = val.replace(/\.{2,}/g, ".");
        // //??????.?????????????????????????????????????????????
        // val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        val = val.replace(/,/g, '.');
        // if (Number(val) > balance) {
        //   return String(balance);
        // }
        if (new BigNumber(balance).isLessThan(val)) {
          return String(balance);
        }
        return val;
      };
      if (e.currentTarget.validity.valid) {
        setVal(chkPrice(e.currentTarget.value));
      }
    },
    [setVal, balance],
  );

  return (
    <Content>
      <Flex flexWrap='wrap' justifyContent='space-between'>
        <LeftBox>
          <Title>
            <Text mr='16px' fontSize='16px'>
              {Token} {t('AccountRecharge')}
            </Text>
            <Text
              style={{ cursor: 'pointer' }}
              fontSize='14px'
              color='textPrimary'
              onClick={() => setVisibleHistory(true)}
            >
              {t('Account history record')}
            </Text>
          </Title>
          <Flex alignItems='center' flexWrap='wrap'>
            {numberList.map((item, index) => (
              <NumberBox
                style={approvedNum === 0 ? { cursor: 'no-drop' } : {}}
                key={item}
                onClick={() => {
                  if (approvedNum === 0) return;
                  const Num = new BigNumber(item).isGreaterThan(balance)
                    ? balance
                    : item;
                  setVal(Num.toString());
                }}
              >
                <Text fontWeight='bold' fontSize='16px'>
                  {item}
                </Text>
              </NumberBox>
            ))}
          </Flex>
        </LeftBox>
        <RightBox>
          <Flex justifyContent='end' mb='12px'>
            <Text fontSize='14px' color='textTips'>
              {t('Account Available Balance')}:{' '}
              {formatDisplayApr(Number(balance))}
            </Text>
          </Flex>
          <InputBox mb='14px'>
            <MyInput
              disabled={approvedNum === 0}
              noShadow
              pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
              inputMode='decimal'
              value={val}
              onChange={handleChange}
              placeholder={t('Account Please enter the recharge amount')}
            />
            <Max
              style={approvedNum === 0 ? { cursor: 'no-drop' } : {}}
              onClick={() => {
                if (approvedNum === 0) return;
                setVal(String(balance));
              }}
            >
              MAX
            </Max>
          </InputBox>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            {account ? (
              <SureBtn
                disable={pending}
                onClick={() => {
                  if (approvedNum > 0) {
                    // ??????
                    handSure();
                  } else {
                    // ??????
                    handleApprove();
                  }
                }}
              >
                {pending ? (
                  <Dots>
                    {approvedNum > 0
                      ? t('Account Trading')
                      : t('Account Approving')}
                  </Dots>
                ) : approvedNum > 0 ? (
                  t('AccountRecharge')
                ) : (
                  t('Account Approve')
                )}
              </SureBtn>
            ) : (
              <ConnectWalletButton />
            )}
          </Flex>
        </RightBox>
      </Flex>
      {/* ????????????????????? */}
      <ModalWrapper
        title={`${Token} ${t('Account history record')}`}
        creactOnUse
        visible={visibleHistory}
        setVisible={setVisibleHistory}
      >
        {/* <PopHeard mb="8px" justifyContent="space-between" alignItems="center">
          <Flex alignItems="baseline">
            <HistoryHead className={ActiveHistory === 1 ? 'active' : ''} onClick={() => setActiveHistory(1)} scale='ld'>????????????</HistoryHead>
            <HistoryHead className={ActiveHistory === 2 ? 'active' : ''} onClick={() => setActiveHistory(2)} scale='ld'>????????????</HistoryHead>
          </Flex>
          <Button onClick={() => setVisibleHistory(false)} padding="0" variant="text">
            <CloseLineIcon width={16} color="primary"></CloseLineIcon>
          </Button>
        </PopHeard> */}
        {/* <HistoryModal token={Token} type={ActiveHistory} /> */}
      </ModalWrapper>
    </Content>
  );
};

export default Recharge;
