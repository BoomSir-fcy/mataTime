import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import { useApproveNftsFarm, useNftStakeFarms, useCancelNftStake } from '../hook';
import { fetchUserNftInfoAsync } from 'store/login/reducer';


export const NftButton: React.FC<{ item: any; token: string; }> = ({ item, token }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { onApprove } = useApproveNftsFarm(token)
  const [pendingTx, setPendingTx] = useState(false)
  const dispatch = useDispatch()

  const handleApprove = useCallback(async () => {
    try {
      await onApprove()
      dispatch(fetchUserNftInfoAsync(account));
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
  const { onStake: onNftsStake } = useNftStakeFarms()
  const { onStake: onCancelNftStake } = useCancelNftStake()

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
          } else {
            // 质押
            await handleStakeOrUnstake(1, item.properties.token, item.properties.token_id)
          }
        } else {
          // 授权 
          await handleApprove()
        }
      } catch (e) {
        console.error(e)
      } finally {
        setPendingTx(false)
      }

    }} >{item.isApprovedMarket ? item.isStakeMarket ? '取消质押' : '质押' : '授权'}</Button>
  );
}