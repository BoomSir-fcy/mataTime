import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import { useDsgNft, useErc20EarnNftPool } from 'hooks/useContract';
import { getNftSocialAddress } from 'utils/addressHelpers';
import { stakeNftFarm, CancelNftStake, createUserContact } from 'utils/calls';
import { uniq } from 'lodash';
import multicall from 'utils/multicall';
import dsgnftAbi from 'config/abi/dsgnft.json';
import nftSocialAbi from 'config/abi/nftSocial.json';
import { NftInfo } from 'store/app/type';
import { getNftsList, getNftInfo } from 'apis/DsgRequest';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { storeAction, useStore } from 'store';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';



// 获取nft头像授权信息
export const useFetchNftApproval = async (account, NftList: NftInfo[]) => {
  const SocialAddress = getNftSocialAddress();
  const tokens = NftList.map(item => item.properties.token);
  const tokensUniq = uniq(tokens);
  try {
    const calls = tokensUniq.map(token => {
      return {
        address: token,
        name: 'isApprovedForAll',
        params: [account, SocialAddress]
      };
    });
    const approveInfo = await multicall(dsgnftAbi, calls);
    return approveInfo.map((item, index) => ({
      token: tokensUniq[index],
      isApprovedMarket: item[0]
    }));
  } catch (error) {
    return [];
  }
};

// 获取Nft头像列表并筛选出头像
export const FetchNftsList = async account => {
  // 筛选可用Nft地址
  const filterAddress = (Nftlist, supAddress) => {
    let list = [];
    for (let i = 0; i < Nftlist.length; i++) {
      for (let j = 0; j < supAddress.length; j++) {
        if (
          Nftlist[i].properties.token.toLowerCase() ===
          supAddress[j].toLowerCase()
        ) {
          list.push(Nftlist[i]);
        }
      }
    }
    return list;
  };
  // 获取质押信息
  // const GetStakeInfo = async (list) => {
  //   const nftStake = await FetchNftStakeType(account)
  //   // if (nftStake[0].token_id) {
  //   //   let result = await getNftInfo(nftStake[0].NFT_address, nftStake[0].token_id)
  //   //   result.isStakeMarket = true
  //   //   let AddStakeNftList = list
  //   //   AddStakeNftList.push(result)
  //   //   return AddStakeNftList
  //   // }
  //   return list
  // }

  // 获取授权信息
  const GetApprovalInfo = async list => {
    const nftApprove = await useFetchNftApproval(account, list);
    const ApproveList = getNftApprovalType(list, nftApprove);
    return ApproveList;
  };
  // 数据合并
  const getNftApprovalType = (nftlist, approveList) => {
    let list = [];
    for (let i = 0; i < nftlist.length; i++) {
      list.push(nftlist[i]);
      for (let j = 0; j < approveList.length; j++) {
        if (approveList[j].token === nftlist[i].properties.token) {
          list[i].isApprovedMarket = approveList[j].isApprovedMarket;
        }
      }
    }
    return list;
  };
  const Nftlist = await GetNftList(account);
  try {
    // 获取可用的Nft头像地址
    const supAddress = await FetchSupportNFT();
    const list = filterAddress(Nftlist, supAddress);
    let AllList = [];
    // let stake = await GetStakeInfo(list)
    if (list.length) {
      AllList = await GetApprovalInfo(list);
    }
    return AllList;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const GetNftList = async (account) => {
  try {
    const Nftlist = await getNftsList(account);
    return Nftlist
  } catch (error) {
    console.error(error)
    return []
  }
}
export const FetchSupportNFT = async () => {
  // const dispatch = useDispatch();
  const SocialAddress = getNftSocialAddress();
  const calls = [
    {
      address: SocialAddress,
      name: 'getSupportNFT'
    }
  ];
  try {
    // 获取可用的Nft头像地址
    const result = await multicall(nftSocialAbi, calls);
    const supAddress = result.map(item => item.sup);
    return supAddress[0];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 获取可用的nft
export const useFetchSupportNFT = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const { toastWarning, toastError } = useToast();
  const addr = useCallback(async () => {
    const add = await FetchSupportNFT();
    if (!add.length) {
      toastError(t('Network error, please refresh and try again'))
    }
    dispatch(storeAction.setNftAddr(add));
  }, [dispatch, toastError, t]);

  useEffect(() => {
    addr();
  }, [account, addr]);
};
// 获取Nft头像质押情况
export const FetchNftStakeType = async account => {
  const SocialAddress = getNftSocialAddress();
  const calls = [
    {
      address: SocialAddress,
      name: 'Users',
      params: [account]
    }
  ];
  try {
    const userInfo = await multicall(nftSocialAbi, calls);
    return userInfo.map((item, index) => ({
      token_id: Number(new BigNumber(item.token_id.toJSON().hex)),
      NFT_address: item.NFT_address,
      user_id: item.user_id,
      isActive: item.isActive
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useFetchNftList = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  // const profile = useStore(p => p.loginReducer.userInfo);
  // let address = account ? account : profile.address;
  useEffect(() => {
    if (account) {
      dispatch(fetchUserNftInfoAsync(account));
    }
  }, [dispatch, account]);
};

// 授权当前类型全部Nft
export const useApproveNftsFarm = (nftAddress: string) => {
  const dsgNftContract = useDsgNft(nftAddress);
  const SocialAddress = getNftSocialAddress();
  const handleApprove = useCallback(async () => {
    try {
      // true授权 false取消授权
      const tx = await dsgNftContract.setApprovalForAll(SocialAddress, true);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      throw e;
    }
  }, [dsgNftContract, SocialAddress]);

  return { onApprove: handleApprove };
};
// 授权当前选择的NFT
export const useApproveOneNfts = (nftAddress: string, tokenId: string) => {
  const dsgNftContract = useDsgNft(nftAddress);
  const SocialAddress = getNftSocialAddress();
  const handleApprove = useCallback(async () => {
    try {
      const tx = await dsgNftContract.approve(SocialAddress, tokenId);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      throw e;
    }
  }, [dsgNftContract, SocialAddress]);

  return { onApprove: handleApprove };
};

// 获取质押地址
export const FetchApproveAddr = async (nftAddress: string, tokenId: string) => {
  const calls = [
    {
      address: nftAddress,
      name: 'getApproved',
      params: [tokenId]
    }
  ];
  try {
    const approvedAddr = await multicall(dsgnftAbi, calls);
    return approvedAddr;
  } catch (error) {
    throw error;
  }
  // 查询当前nft授权
  // try {
  //   const ApprovedAddr = await FetchApproveAddr(nftAddress, tokenId)
  //   if (ApprovedAddr[0][0].toLowerCase() === SocialAddress.toLowerCase()) {
  //   } else {
  //     throw new Error("not address");
  //   }
  // } catch (error) {
  //   throw error
  // }
};

// 质押Nft 已废弃
export const useNftStakeFarms = () => {
  const masterChefContract = useErc20EarnNftPool();
  const handleStake = useCallback(
    async (address, nftId) => {
      await stakeNftFarm(masterChefContract, address, nftId);
    },
    [masterChefContract]
  );

  return { onStake: handleStake };
};

// 更换Nft头像
export const useCancelNftStake = () => {
  const masterChefContract = useErc20EarnNftPool();
  const handleStake = useCallback(
    async (address, nftId) => {
      await CancelNftStake(masterChefContract, address, nftId);
    },
    [masterChefContract]
  );
  return { onStake: handleStake };
};

// 用户验证
export const useContract = () => {
  const masterChefContract = useErc20EarnNftPool();
  const SocialAddress = getNftSocialAddress();

  const checkNickname = useCallback(
    async (nickname: string) => {
      const calls = [
        {
          address: SocialAddress,
          name: 'nicknames',
          params: [nickname]
        },
        {
          address: SocialAddress,
          name: 'checkNickname',
          params: [nickname]
        }
      ];
      try {
        const isCheck = await multicall(nftSocialAbi, calls);
        return [isCheck[0][0], isCheck[1][0]];
      } catch (error) {
        console.log(error);
        return [false, false];
      }
    },
    [masterChefContract]
  );

  // 创建用户
  const createUser = useCallback(
    async (nickname: string, nftAddress: string, tokenID: number, InviteAddress: string) => {
      try {
        const userinfo = await createUserContact(
          masterChefContract,
          nickname,
          nftAddress,
          tokenID,
          InviteAddress
        );
        return userinfo;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [masterChefContract]
  );

  return { checkNickname, createUser };
};
