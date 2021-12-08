import React, { useCallback } from 'react';
import multicall from 'utils/multicall';
import erc20Abi from 'config/abi/erc20.json';
import rewardAuthorAbi from 'config/abi/RewardAuthor.json';
import { ethers } from 'ethers';
import { useERC20 } from 'hooks/useContract';
import { RewardAuthorContactReward } from 'utils/calls';
import { useRewardAuthor } from 'hooks/useContract';
import { getRewardAuthorAddress, getBnbAddress } from 'utils/addressHelpers';
import { Api } from 'apis';

export const RewardAuthorList = [0.01, 0.02, 30, 50, 100, 200];

// 用户打赏
export const RewardAuthorContract = () => {
  const masterChefContract = useRewardAuthor();
  const RewardAuthorAddress = getRewardAuthorAddress();

  const getTokens = useCallback(async () => {
    const calls = [
      {
        address: RewardAuthorAddress,
        name: 'getSupportTokenViews',
        params: []
      }
    ];
    try {
      const tokenView = await multicall(rewardAuthorAbi, calls);
      return tokenView[0][0];
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  // 是否需要授权
  const approve = useCallback(async (account: string, tokens: string[]) => {
    const calls = tokens.map(address => ({
      address: address,
      name: 'allowance',
      params: [account, RewardAuthorAddress]
    }));
    try {
      const index = tokens.findIndex(address => getBnbAddress() === address);
      const MatterApprove = await multicall(erc20Abi, calls);
      MatterApprove[index] =
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
      return MatterApprove;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  // 打赏用户
  const rewardUsers = useCallback(
    async (target, token, postType, postId, amount, bool) => {
      try {
        const res = await RewardAuthorContactReward(
          masterChefContract,
          target,
          token,
          postType,
          postId,
          amount,
          bool
        );
        return res;
      } catch (error: any) {
        console.log(error);
        return error?.code || false;
      }
    },
    [masterChefContract]
  );

  return { getTokens, approve, rewardUsers };
};

export const OnApprove = address => {
  // 代币是否需要授权
  const coinContract = useERC20(address);
  const RewardAuthorAddress = getRewardAuthorAddress();

  const onApprove = useCallback(async () => {
    try {
      const tx = await coinContract.approve(
        RewardAuthorAddress,
        ethers.constants.MaxUint256
      );
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [coinContract]);

  return { handleApprove: onApprove };
};

export const GetCoinPrice = () => {
  const getPrice = useCallback(async (address: string) => {
    try {
      const res = await Api.CoinsApi.getCoinPrice(address);
      if (Api.isSuccess(res)) {
        return res.data;
      }
      return {};
    } catch (error) {}
  }, []);

  return { getPrice };
};

export const GetPostRewardAuthor = () => {
  const getInfo = useCallback(async (type, id) => {
    try {
      const res = await Api.HomeApi.getPostRewardAuthor(type, id);
      if (Api.isSuccess(res)) {
        return res.data;
      }
      return {};
    } catch (error) {}
  }, []);

  return { getInfo };
};
