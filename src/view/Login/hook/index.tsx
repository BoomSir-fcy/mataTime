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
import { getNftsList } from 'apis/DsgRequest';

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

// 获取Nft头像列表并筛选出头像
export const FetchNftsList = async (account) => {

  // 筛选可用Nft地址
  const filterAddress = (Nftlist, supAddress) => {
    let list = []
    for (let i = 0; i < Nftlist.length; i++) {
      for (let j = 0; j < supAddress.length; j++) {
        console.log(Nftlist[i].properties.token, supAddress[j], String(Nftlist[i].properties.token) === String(supAddress[j]));
        if (Nftlist[i].properties.token == supAddress[j]) {
          list.push(Nftlist[i])
          console.log(list);

        }
      }
    }
    return list
  }

  const SocialAddress = getNftSocialAddress()
  const Nftlist = await getNftsList(account) || []
  const calls = [
    {
      address: SocialAddress,
      name: 'getSupportNFT',
    },
  ]
  try {
    // 获取可用的Nft头像地址
    const result = await multicall(nftSocialAbi, calls)
    const supAddress = result.map(item => (item.sup[0]))
    const list = filterAddress(Nftlist, supAddress)
    console.log(list);
    return
  } catch (error) {
    console.log(error);
    return []
  }
}

// 获取Nft头像质押情况
export const FetchNftStakeType = async (account) => {
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