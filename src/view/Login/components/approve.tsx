import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useApproveNftsFarm, useNftStakeFarms } from '../hook';


export const NftButton: React.FC<{ item: any; token: string; upDate: () => void }> = ({ item, token, upDate }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { onApprove } = useApproveNftsFarm(token)
  const [pendingTx, setPendingTx] = useState(false)

  const handleApprove = useCallback(async () => {
    try {
      await onApprove()
      upDate()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
  const { onStake: onNftsStake } = useNftStakeFarms()
  const handleStakeOrUnstake = useCallback(
    async (address: string, tokenId: string) => {
      await onNftsStake(address, tokenId)
      upDate()
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
          } else {
            // 质押
            await handleStakeOrUnstake(item.properties.token, item.properties.token_id)
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