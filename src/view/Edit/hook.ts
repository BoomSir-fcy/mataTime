import React, { useCallback } from 'react';
import multicall from 'utils/multicall';
import nftSocialAbi from 'config/abi/nftSocial.json';
import { updateNickname } from 'utils/calls';
import { useDsgNft, useErc20EarnNftPool } from 'hooks/useContract';
import { getNftSocialAddress } from 'utils/addressHelpers';

// 用户验证
export const useProfileContract = () => {
  const masterChefContract = useErc20EarnNftPool();
  const SocialAddress = getNftSocialAddress();

  const checkNickname = useCallback(
    async (nickname: string) => {
      const calls = [
        {
          address: SocialAddress,
          name: 'checkNickname',
          params: [nickname]
        }
      ];
      try {
        const isCheck = await multicall(nftSocialAbi, calls);
        return isCheck[0][0];
      } catch (error) {
        return false;
      }
    },
    [masterChefContract]
  );

  // 修改用户
  const updateProfileNickname = useCallback(
    async (nickname: string) => {
      try {
        const userinfo = await updateNickname(masterChefContract, nickname);
        return userinfo;
      } catch (error) {
        return false;
      }
    },
    [masterChefContract]
  );

  return { checkNickname, updateProfileNickname };
};
