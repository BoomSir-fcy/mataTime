import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useDsgNft, useErc20EarnNftPool } from 'hooks/useContract'
import { getNftSocialAddress } from 'utils/addressHelpers';
import { stakeNftFarm } from 'utils/calls';
import { uniq } from 'lodash';
import multicall from 'utils/multicall';
import dsgnftAbi from 'config/abi/dsgnft.json'
import nftSocialAbi from 'config/abi/nftSocial.json'
import { NftInfo } from 'store/app/type';

// 获取nft头像授权信息
export const useFetchNftApproval = async (account, NftList: NftInfo[]) => {
  const SocialAddress = getNftSocialAddress()
  const tokens = NftList.map((item) => item.properties.token)
  const tokensUniq = uniq(tokens)
  try {
    const calls = tokensUniq.map((token) => {
      return {
        address: token,
        name: 'isApprovedForAll',
        params: [account, SocialAddress],
      }
    })
    const userInfo = await multicall(dsgnftAbi, calls)
    return userInfo.map((item, index) => ({
      token: tokensUniq[index],
      isApprovedMarket: item[0],
    }))
  } catch (error) {
    return []
  }
}
// 获取Nft头像质押情况
export const useFetchNftStakeType = async (account) => {
  const SocialAddress = getNftSocialAddress()
  const calls = [
    {
      address: SocialAddress,
      name: 'Users',
      params: [account]
    },
  ]
  try {
    const userInfo = await multicall(nftSocialAbi, calls)
    return userInfo.map((item, index) => ({
      token_id: Number(new BigNumber(item.token_id.toJSON().hex)),
      NFT_address: item.NFT_address,
      user_id: item.user_id,
    }))
  } catch (error) {
    console.log(error);
    return []
  }
}

// 授权Nft
export const useApproveNftsFarm = (nftAddress: string) => {
  const dsgNftContract = useDsgNft(nftAddress)
  const SocialAddress = getNftSocialAddress()
  const handleApprove = useCallback(async () => {
    try {
      // true授权 false取消授权
      const tx = await dsgNftContract.setApprovalForAll(SocialAddress, true)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      throw e
    }
  }, [dsgNftContract, SocialAddress])

  return { onApprove: handleApprove }
}
// 质押Nft
export const useNftStakeFarms = () => {
  const masterChefContract = useErc20EarnNftPool()
  const handleStake = useCallback(
    async (address, nftId) => {
      console.log(address, nftId, masterChefContract);

      await stakeNftFarm(masterChefContract, address, nftId)
    },
    [masterChefContract],
  )

  return { onStake: handleStake }
}