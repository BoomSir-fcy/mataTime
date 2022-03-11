import React, { useCallback, useMemo } from 'react';
import { ModalWrapper } from 'components';
import { Box, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';

import { ModalOperator } from '../ShieldModal';
import { ReportModalWrapper } from 'components/ModalWrapper/ReportModal/style';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { shortenAddress } from 'utils/contract';
import useTheme from 'hooks/useTheme';
import CircleLoader from 'components/Loader/CircleLoader';
import { useTribeMemberAction } from 'view/Me/Tribe/hooks';
import { useToast } from 'hooks/useToast';
import { useGetBnbBalance, useTokenBalance } from 'hooks/useTokenBalance';
import { getBalanceAmount } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { TRIBE_FEE_BNB_TOKEN } from 'config';
import Dots from 'components/Loader/Dots';

interface Info {
  add_time: number;
  address: string;
  fee_token: string;
  is_mute: number;
  nft_id: number;
  nick_name: string;
  symbol: string;
  uid: number;
}

type IProp = {
  show: boolean;
  UserInfo: Info;
  RefundAmount: BigNumber;
  ApproveNum: number;
  pending: boolean;
  onClose: () => void;
  onQuery: () => void;
  setpending: (type) => void;
  upDateApproveNum: () => void;
};

const Content = styled(Box)`
  padding: 25px 0;
`;

export const DeleteMemberModal = React.memo((props: IProp) => {
  const { t, getHTML } = useTranslation();
  const {
    show,
    onClose,
    onQuery,
    setpending,
    UserInfo,
    RefundAmount,
    ApproveNum,
    pending,
    upDateApproveNum,
  } = props;
  const { theme } = useTheme();
  const { account } = useWeb3React();
  const { onApprove } = useTribeMemberAction(UserInfo?.fee_token);
  const { balance: BNBBalance } = useGetBnbBalance();
  const { balance: TokenBalance } = useTokenBalance(UserInfo?.fee_token);

  const { toastError, toastSuccess } = useToast();

  const IsBnb = useMemo(() => {
    return UserInfo?.fee_token.toLocaleLowerCase() === TRIBE_FEE_BNB_TOKEN;
  }, [UserInfo, TRIBE_FEE_BNB_TOKEN]);

  // 授权
  const handleApprove = useCallback(async () => {
    setpending(true);
    try {
      await onApprove();
      toastSuccess(t('setNftAuthorizationSuccess'));
    } catch (e) {
      console.error(e);
      toastError(t('setNftAuthorizationFail'));
    } finally {
      upDateApproveNum();
      setpending(false);
    }
  }, [onApprove, account]);

  return (
    <ModalWrapper
      creactOnUse
      title={t('deleteMemberModalTitle', { value: UserInfo?.nick_name })}
      visible={show}
      setVisible={onClose}
    >
      <ReportModalWrapper>
        <Content>
          <Flex justifyContent='start'>
            <Text mb='10px' fontSize='14px' color='textTips'>
              {UserInfo.symbol}
              {t('Balance')}:
              {IsBnb ? (
                BNBBalance ? (
                  getBalanceAmount(BNBBalance).toString()
                ) : (
                  <CircleLoader />
                )
              ) : TokenBalance ? (
                getBalanceAmount(TokenBalance).toString()
              ) : (
                <CircleLoader />
              )}
            </Text>
          </Flex>
          <Flex alignItems='baseline' flexWrap='wrap'>
            <Text>
              {getHTML('deleteMemberModalDes', {
                value: `<span style="color:${
                  theme.colors.backgroundPrimary
                }">@${shortenAddress(UserInfo.address)}</span>`,
              })}
            </Text>
            <Text padding='0 4px' color='textOrigin'>
              {RefundAmount !== null ? (
                getBalanceAmount(RefundAmount).toString()
              ) : (
                <CircleLoader />
              )}
            </Text>
            <Text>{UserInfo.symbol}!</Text>
          </Flex>
        </Content>
        <ModalOperator
          queryText={
            ApproveNum ? (
              t('modalQuery')
            ) : pending ? (
              <Dots>{t('Account Approving')}</Dots>
            ) : (
              t('Account Approve')
            )
          }
          disabled={pending || ApproveNum === null || RefundAmount === null}
          onClose={() => onClose()}
          onQuery={() => {
            const Balance = IsBnb ? BNBBalance : TokenBalance;
            if (ApproveNum) {
              if (new BigNumber(Balance).isLessThan(RefundAmount)) {
                toastError(t('Insufficient balance'));
              } else {
                onQuery();
              }
            } else {
              handleApprove();
            }
          }}
        />
      </ReportModalWrapper>
    </ModalWrapper>
  );
});
