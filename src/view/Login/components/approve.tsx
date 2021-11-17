import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import { useApproveNftsFarm, useApproveOneNfts, useNftStakeFarms, useCancelNftStake } from '../hook';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { storeAction } from 'store';
import { toast } from 'react-toastify';


export const NftButton: React.FC<{ item: any; token: string; }> = ({ item, token }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { onApprove } = useApproveNftsFarm(token)
  const { onApprove: Approve } = useApproveOneNfts(token, item?.properties?.token_id)
  const { onStake: onNftsStake } = useNftStakeFarms()
  const { onStake: onCancelNftStake } = useCancelNftStake()
  const [pendingTx, setPendingTx] = useState(false)
  const dispatch = useDispatch()
  // 授权
  const handleApprove = useCallback(async () => {
    try {
      // 一键授权
      await onApprove()
      // 单个授权
      // await Approve()
      dispatch(fetchUserNftInfoAsync(account));
    } catch (e) {
      throw e;
    }
  }, [onApprove])

  // 质押/取消质押
  const handleStakeOrUnstake = useCallback(
    async (type: number, address: string, tokenId: string) => {
      if (type) {
        await onNftsStake(address, tokenId)
      } else {
        // 取消质押
        await onCancelNftStake()
      }
      dispatch(fetchUserNftInfoAsync(account));
    },
    [onNftsStake, account],
  )
  return (
    <Button disabled={pendingTx} onClick={async () => {
      setPendingTx(true)
      try {
        if (item.isApprovedMarket) {
          if (item.isStakeMarket) {
            // 取消质押
            await handleStakeOrUnstake(0, item.properties.token, item.properties.token_id)
            toast.success('取消质押成功');
          } else {
            // 质押
            await handleStakeOrUnstake(1, item.properties.token, item.properties.token_id)
            dispatch(storeAction.setUserNftStake({ isStakeNft: true }));
            toast.success('质押成功');
          }
        } else {
          // 授权 
          await handleApprove()
          toast.success('授权成功');
        }
      } catch (e) {
        console.error(e)
        toast.error('操作失败');
      } finally {
        setPendingTx(false)
      }

    }} >{item.isStakeMarket ? '取消质押' : '质押'}</Button>
  );
}