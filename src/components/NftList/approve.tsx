import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { fetchThunk, storeAction, useStore } from 'store';
import { toast } from 'react-toastify';
import { useNftStakeFarms, useCancelNftStake } from 'view/Login/hook';
import Dots from '../Loader/Dots';

const NowrapBtn = styled(Button)`
  width: max-content;
  word-break: keep-all;
`;

export const NftButton: React.FC<{ item: any }> = ({ item }) => {
  console.log(item);

  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { onStake: onNftsStake } = useNftStakeFarms();
  const { onStake: onCancelNftStake } = useCancelNftStake();
  const isStakeNft = useStore(p => p.loginReducer.isStakeNft);
  const [pendingTx, setPendingTx] = useState(false);
  const dispatch = useDispatch();

  // 质押/更换质押
  const handleStakeOrUnstake = useCallback(
    async (type: number, address: string, tokenId: string) => {
      if (type) {
        await onNftsStake(address, tokenId);
      } else {
        // 更换头像
        await onCancelNftStake(address, tokenId);
        setTimeout(() => {
          dispatch(fetchUserNftInfoAsync(account));
          dispatch(fetchThunk.fetchUserInfoAsync());
          setPendingTx(false);
          toast.success('更换成功');
        }, 15000);
      }
    },
    [onNftsStake, onCancelNftStake, account]
  );

  return (
    <NowrapBtn
      disabled={pendingTx}
      onClick={async () => {
        if (item.isApprovedMarket) {
          setPendingTx(true);
          try {
            if (isStakeNft) {
              // 替换质押
              await handleStakeOrUnstake(
                0,
                item.properties.token,
                item.properties.token_id
              );
            } else {
              // 质押
              await handleStakeOrUnstake(
                1,
                item.properties.token,
                item.properties.token_id
              );
              dispatch(storeAction.setUserNftStake({ isStakeNft: true }));
              dispatch(fetchUserNftInfoAsync(account));
              toast.success('质押成功');
              setPendingTx(false);
            }
          } catch (e) {
            console.error(e);
            toast.error('操作失败');
            setPendingTx(false);
          }
        } else {
          toast.error('请先选择头像');
        }
      }}
    >
      {pendingTx ? (
        <Dots>{t('质押中')}</Dots>
      ) : isStakeNft ? (
        t('替换质押')
      ) : (
        t('质押')
      )}
    </NowrapBtn>
  );
};
