import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { storeAction, useStore } from 'store';
import { toast } from 'react-toastify';
import { useNftStakeFarms, useCancelNftStake } from 'view/Login/hook';


export const NftButton: React.FC<{ item: any }> = ({ item }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { onStake: onNftsStake } = useNftStakeFarms()
  const { onStake: onCancelNftStake } = useCancelNftStake()
  const isStakeNft = useStore(p => p.loginReducer.isStakeNft);
  const userInfo: any = useStore(p => p.loginReducer.userInfo);
  const [pendingTx, setPendingTx] = useState(false)
  const dispatch = useDispatch()

  // 质押/更换质押
  const handleStakeOrUnstake = useCallback(
    async (type: number, address: string, tokenId: string) => {
      if (type) {
        await onNftsStake(address, tokenId)
      } else {
        // 更换质押
        await onCancelNftStake(address, tokenId)
      }
      dispatch(fetchUserNftInfoAsync(account));
    },
    [onNftsStake, account],
  )
  return (
    <Button disabled={pendingTx} onClick={async () => {
      if (item.isApprovedMarket) {
        setPendingTx(true)
        try {
          if (isStakeNft) {
            // 替换质押
            if (userInfo.nft_id === item.properties.token_id) {
              toast.error('不能选择当前质押头像');
            } else {
              await handleStakeOrUnstake(0, item.properties.token, item.properties.token_id)
              toast.success('更换成功');
            }
          } else {
            // 质押
            await handleStakeOrUnstake(1, item.properties.token, item.properties.token_id)
            dispatch(storeAction.setUserNftStake({ isStakeNft: true }));
            toast.success('质押成功');
          }
        } catch (e) {
          console.error(e)
          toast.error('操作失败');
        } finally {
          setPendingTx(false)
        }
      } else {
        toast.error('请先选择头像');
      }

    }} >{isStakeNft ? '替换质押' : '质押'}</Button>
  );
}