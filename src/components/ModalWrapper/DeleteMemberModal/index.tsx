import React, { useCallback } from 'react';
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
import { useTokenBalance } from 'hooks/useTokenBalance';
import { getBalanceAmount } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';

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
  RefundAmount: number;
  ApproveNum: number;
  pending: boolean;
  onClose: () => void;
  onQuery: () => void;
  setpending: (type) => void;
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
  } = props;
  const { theme } = useTheme();
  const { account } = useWeb3React();
  const { onApprove } = useTribeMemberAction(UserInfo?.fee_token);
  const { balance: TokenBalance } = useTokenBalance(UserInfo?.fee_token);
  const { toastError, toastSuccess } = useToast();

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
          <Flex alignItems='baseline'>
            <Text>
              {getHTML('deleteMemberModalDes', {
                value: `<span style="color:${
                  theme.colors.backgroundPrimary
                }">@${shortenAddress(UserInfo.address)}</span>`,
              })}
            </Text>
            <Text padding='0 4px' color='textOrigin'>
              {RefundAmount ? RefundAmount : <CircleLoader />}
            </Text>
            <Text>{UserInfo.symbol}!</Text>
          </Flex>
        </Content>
        <ModalOperator
          queryText={
            ApproveNum
              ? t('modalQuery')
              : pending
              ? t('Account Approving')
              : t('Account Approve')
          }
          disabled={pending}
          onClose={() => onClose()}
          onQuery={() => {
            if (ApproveNum) {
              if (new BigNumber(TokenBalance).isLessThan(RefundAmount)) {
                toastError(t('余额不足'));
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
