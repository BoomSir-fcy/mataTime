import BigNumber from 'bignumber.js'
import { useCallback, useEffect } from 'react'
import { ethers, Contract } from 'ethers'
import { useDsgNft, useErc20EarnNftPool } from 'hooks/useContract'
import { getNftSocialAddress } from 'utils/addressHelpers';
import { stakeNftFarm, CancelNftStake } from 'utils/calls';
import { uniq } from 'lodash';
import multicall from 'utils/multicall';
import dsgnftAbi from 'config/abi/dsgnft.json'
import nftSocialAbi from 'config/abi/nftSocial.json'
import { NftInfo } from 'store/app/type';
import { getNftsList, getNftInfo } from 'apis/DsgRequest';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { fetchUserNftInfoAsync } from 'store/login/reducer';

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
        if (Nftlist[i].properties.token.toLowerCase() === supAddress[j].toLowerCase()) {
          list.push(Nftlist[i])
        }
      }
    }
    return list
  }
  // 获取质押信息
  const GetStakeInfo = async (list) => {
    const nftStake = await FetchNftStakeType(account)
    if (nftStake[0].token_id) {
      let result = await getNftInfo(nftStake[0].NFT_address, nftStake[0].token_id)
      result.isStakeMarket = true
      let AddStakeNftList = list
      AddStakeNftList.push(result)
      return AddStakeNftList
    }
    return list
  }

  // 获取授权信息
  const GetApprovalInfo = async (list) => {
    const nftApprove = await useFetchNftApproval(account, list)
    const ApproveList = getNftApprovalType(list, nftApprove)
    return ApproveList
  }
  // 数据合并
  const getNftApprovalType = (nftlist, approveList) => {
    let list = []
    for (let i = 0; i < nftlist.length; i++) {
      list.push(nftlist[i])
      for (let j = 0; j < approveList.length; j++) {
        if (approveList[j].token === nftlist[i].properties.token) {
          list[i].isApprovedMarket = approveList[j].isApprovedMarket
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
    let AllList = []
    if (list.length) {
      let stake = await GetStakeInfo(list)
      AllList = await GetApprovalInfo(stake)
    }
    return AllList
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

export const useFetchNftList = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  useEffect(() => {
    dispatch(fetchUserNftInfoAsync(account));
  }, [dispatch, account])
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
      await stakeNftFarm(masterChefContract, address, nftId)
    },
    [masterChefContract],
  )

  return { onStake: handleStake }
}
// 取消质押Nft
export const useCancelNftStake = () => {
  const masterChefContract = useErc20EarnNftPool()
  const handleStake = useCallback(
    async () => {
      await CancelNftStake(masterChefContract)
    },
    [masterChefContract],
  )

  return { onStake: handleStake }
}