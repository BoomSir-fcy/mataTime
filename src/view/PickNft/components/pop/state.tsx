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
import { Link } from 'react-router-dom'

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
const SureBtn = styled(Link)`
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
  onClose: () => void;
  state: number; // 邀请码现在的状态 0.为生成 1.未使用 2.已使用
  nftLength: number
}

const StateModal: React.FC<init> = ({ onClose, state, nftLength }) => {
  const { t } = useTranslation();

  return (
    <CountBox>
      {/* <Text mb='16px' fontSize='14px' color='textOrigin'>
        * {t('Effective within 10 minutes after being locked')}
      </Text> */}
      {
        nftLength === 0 ? (
          <Text fontSize='18px' bold textAlign="center">{t('您暂无邀请资格')}</Text>
        )
          :
          (<>
            {
              state === 0 && (
                <Text fontSize='18px' bold textAlign="center">{t('当前邀请码不正确')}</Text>
              )
            }
            {
              state === 2 && (
                <Text fontSize='18px' bold textAlign="center">{t('当前邀请码已被使用')}</Text>
              )
            }
          </>)
      }
      <Flex marginTop="16px" flexDirection='column' justifyContent='center' alignItems='center'>
        <Link to="/login">
          <Button
            mb='10px'
            width="100%"
            onClick={() => {
              onClose();
            }}
          >
            {t('我知道了')}
          </Button>
        </Link>
      </Flex>
    </CountBox>
  );
};

export default StateModal;
