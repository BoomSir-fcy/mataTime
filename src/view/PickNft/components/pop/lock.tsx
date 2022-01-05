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

// type 1 充值 2 提币
interface init {
  onClose: () => void;
}

const LockModal: React.FC<init> = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [val, setVal] = useState('');
  const [pending, setpending] = useState(false);

  // 授权
  const handLock = useCallback(async () => {
    setpending(true);
    try {
      // await onApprove(token);
      toast.success(t('锁定成功'));
      onClose();
    } catch (e) {
      console.error(e);
      toast.error(t('锁定失败'));
    } finally {
      setpending(false);
    }
  }, [account]);

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
          placeholder={t('锁定NFT邀请名额，您将有更多的选择')}
        />
      </InputBox>
      <Text mb='16px' fontSize='14px' color='textOrigin'>
        {t('* 锁定之后10分钟内有效')}
      </Text>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <SureBtn
          mb='10px'
          disable={pending}
          onClick={() => {
            handLock();
          }}
        >
          {pending ? <Dots>{t('锁定NFT')}</Dots> : t('锁定NFT')}
        </SureBtn>
      </Flex>
    </CountBox>
  );
};

export default LockModal;
