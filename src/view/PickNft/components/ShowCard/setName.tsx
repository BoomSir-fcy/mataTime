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
import { shortenAddress } from 'utils/contract';
import { useImmer } from 'use-immer';
import { getBLen } from 'utils';

const CountBox = styled(Box)``;

const Submit = styled(Button)`
  width: 100%;
  text-transform: capitalize;
`;

const InputItems = styled(Flex)`
  position: relative;
  width: 100%;
`;
const MyInput = styled(Input)`
  border-radius: 10px;
  padding: 12px 16px;
  height: 50px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  color: ${({ theme }) => theme.colors.white_black};
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`;

const WalletAddr = styled.div`
  padding: 4px 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;
`;

const NameVerify = styled(Text)`
  width: 100%;
  position: absolute;
  left: 2px;
  top: 75px;
`;

const BtnBox = styled(Flex)`
  padding: 16px 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 0;
  }
`;

interface init {
  onComplete: (name: string) => void
}

const SetNickName: React.FC<init> = ({ onComplete }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [val, setVal] = useState('');
  const [pending, setpending] = useState(false);
  const [haveNickName, sethaveNickName] = useState(false);
  const [state, setState] = useImmer({
    isSignin: false,
    nickName: '',
  });

  return (
    <CountBox>
      <Flex mb='16px' justifyContent='space-between' alignItems='center'>
        <Text>{t('loginInputTitleNickname')}</Text>
        <WalletAddr>{shortenAddress(account, 3)}</WalletAddr>
      </Flex>
      <InputItems marginBottom='46px' alignItems='center'>
        <Box width='100%'>
          <MyInput
            onChange={event => {
              const { value } = event.target;
              if (event.target.value.length < 1) {
                sethaveNickName(false);
              } else {
                sethaveNickName(true);
              }
              let nick_name = value
                .replace(/(^\s*)|(\s*$)/g, '')
                .replace(/\s+/g, ' ');
              setState(p => {
                p.nickName = nick_name;
              });
            }}
            value={state.nickName}
            maxLength={30}
            placeholder={t('loginSetNickNameEmpty')}
          />
          <Text
            color={getBLen(state.nickName) > 30 ? 'failure' : 'textTips'}
            textAlign='right'
            ellipsis
          >
            {t('loginCountCharacters', { value: getBLen(state.nickName) })}
          </Text>
          <NameVerify small color='textTips' textAlign='right'>
            {t('loginInputValueNickname')}
          </NameVerify>
        </Box>
      </InputItems>
      <BtnBox justifyContent='center'>
        <Submit
          scale='ld'
          onClick={async () => {
            try {
              setpending(true)
              await onComplete(state.nickName)
            } catch (error) {
              console.log(error)
            } finally {
              setpending(false)
            }
          }}
          disabled={!haveNickName || pending}
        >
          {Boolean(pending) ? (
            <Dots>{t('loginSignUpComplete')}</Dots>
          ) : (
            t('loginSignUpComplete')
          )}
        </Submit>
      </BtnBox>
    </CountBox>
  );
};

export default SetNickName;
