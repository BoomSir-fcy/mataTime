/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { BIG_TEN } from 'utils/bigNumber';
import Dots from 'components/Loader/Dots';
import { useStore } from 'store';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization';
import { useLockInviteCode } from 'view/PickNft/hooks/exchange';

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
const SureBtn = styled(Button)`
  padding: 6px 30px;
  width: 60%;
`;
const MyInput = styled(Input)`
  border-radius: 10px;
  padding: 12px 16px;
  height: 50px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`;

interface init {
  onLock: (val: string) => void;
  InviteCode: string;
  lockUser: string;
  isLockAvailable: boolean;
}

const LockModal: React.FC<init> = ({
  onLock,
  InviteCode,
  lockUser,
  isLockAvailable,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [val, setVal] = useState('');
  const [pending, setpending] = useState(false);

  // 锁定
  const handLock = useCallback(async () => {
    if (lockUser !== account && isLockAvailable) {
      toast.error(t('Invitation code has been locked by another user'));
      return;
    }
    if (lockUser === account && isLockAvailable) {
      toast.warning(t('The invitation code has been locked by you'));
      return;
    }
    setpending(true);
    try {
      await onLock(val);
      toast.success(t('Locked successfully'));
    } catch (e) {
      console.error(e);
      toast.error(t('Lock failed'));
    } finally {
      setpending(false);
    }
  }, [account, onLock, val, isLockAvailable, lockUser]);

  useEffect(() => {
    setVal(InviteCode);
  }, [InviteCode]);
  return (
    <CountBox>
      <InputBox mb='10px'>
        <MyInput
          noShadow
          value={val}
          onChange={e => {
            if (e.currentTarget.validity.valid) {
              setVal(e.currentTarget.value);
            }
          }}
          placeholder={t(
            'Lock the NFT invitation quota, you will have more choices',
          )}
        />
      </InputBox>
      <Text mb='16px' fontSize='14px' color='textOrigin'>
        * {t('You can lock the invitation code for 10 minutes')}
      </Text>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <SureBtn
          mb='10px'
          disable={pending}
          onClick={() => {
            handLock();
          }}
        >
          {pending ? <Dots>{t('Lock NFT')}</Dots> : t('Lock NFT')}
        </SureBtn>
      </Flex>
    </CountBox>
  );
};

export default LockModal;
