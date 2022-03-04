import React from 'react';
import BigNumber from 'bignumber.js';
import tribeAbi from 'config/abi/tribe.json';
import erc20Abi from 'config/abi/erc20.json';
import { getBalanceNumber } from 'utils/formatBalance';
import { ethers } from 'ethers';
import { getTribeAddress, getBnbAddress } from 'utils/addressHelpers';
import { useERC20 } from 'hooks/useContract';

import multicall from 'utils/multicall';
import { FeeCoin, TribeBaseInfo, TribesNFTInfo } from './type';

import { DEFAULT_TOKEN_DECIMAL } from 'config';

// 收费代币token
export const getFeeTokenList = async () => {
  const address = getTribeAddress();
  const calls = [
    {
      address,
      name: 'listViewFeeToken',
      params: [],
    },
  ];
  try {
    const [tokens] = await multicall(tribeAbi, calls);
    return tokens.sup?.map((item, i) => {
      return {
        tokenAddress: item,
        name: tokens.names[i],
        decimal: new BigNumber(tokens.decimals[i]?.toJSON().hex).toNumber(),
      } as FeeCoin;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 门票NFT token
export const getTicketNftTokenList = async () => {
  const address = getTribeAddress();
  const calls = [
    {
      address,
      name: 'listViewNFTToken',
      params: [],
    },
  ];
  try {
    const tokens = await multicall(tribeAbi, calls);
    // return tokens;
    return ['0x9fcaCa63afD8DA8Fc3E00A4D0ef4a54ac0AAE625'];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTribeBaseInfoData = async (tribeId: number) => {
  const address = getTribeAddress();
  const calls = [
    {
      address,
      name: 'tribesInfo',
      params: [tribeId],
    },
    {
      address,
      name: 'extraTribesInfo',
      params: [tribeId],
    },
    {
      address,
      name: 'extraTribesNFTInfo',
      params: [tribeId],
    },
  ];
  try {
    const [info, extraTribeInfo, extraNftInfo] = await multicall(
      tribeAbi,
      calls,
    );
    const baseInfo = {
      name: info.name,
      logo: info.logo,
      introduction: info.introduction,
      feeToken: info.feeToken,
      feeAmount: new BigNumber(info.feeAmount.toJSON().hex).toNumber(),
      validDate: new BigNumber(info.validDate.toJSON().hex).toNumber(),
      perTime: new BigNumber(info.perTime.toJSON().hex).toNumber(),
      ownerPercent: new BigNumber(info.ownerPercent.toJSON().hex).toNumber(),
      authorPercent: new BigNumber(info.authorPercent.toJSON().hex).toNumber(),
      memberPercent: new BigNumber(info.memberPercent.toJSON().hex).toNumber(),
      nftAddress: '',
      nftid: null,
    };
    const nftInfo = {
      ownerNFTName: extraNftInfo.ownerNFTName,
      ownerNFTIntroduction: extraNftInfo.ownerNFTIntroduction,
      ownerNFTImage: extraNftInfo.ownerNFTImage,
      memberNFTName: extraNftInfo.memberNFTName,
      memberNFTIntroduction: extraNftInfo.memberNFTIntroduction,
      memberNFTImage: extraNftInfo.memberNFTImage,
      claimOnwerNFT: extraTribeInfo.claimOnwerNFT,
      initMemberNFT: extraTribeInfo.initMemberNFT,
    } as TribesNFTInfo;
    return {
      baseInfo,
      nftInfo,
    };
  } catch (error) {
    console.error(error);
    const baseInfo = {
      name: '',
      logo: '',
      introduction: '',
      feeToken: '',
      feeAmount: '',
      validDate: null,
      perTime: null,
      ownerPercent: null,
      authorPercent: null,
      memberPercent: null,
      nftAddress: '',
      nftid: null,
    };
    const nftInfo = {
      name: '',
      logo: '',
      introduction: '',
      feeToken: '',
      feeAmount: '',
      validDate: null,
      perTime: null,
      ownerPercent: null,
      authorPercent: null,
      memberPercent: null,
      nftAddress: '',
      nftid: null,
    };
    return {
      baseInfo,
      nftInfo,
    };
  }
};

export const getTribeBaseInfo = async (tribeId: number) => {
  const address = getTribeAddress();
  const calls = [
    {
      address,
      name: 'tribesInfo',
      params: [tribeId],
    },
    {
      address,
      name: 'extraTribesNFTInfo',
      params: [tribeId],
    },
  ];
  try {
    const [info, extraInfo] = await multicall(tribeAbi, calls);
    return {
      name: info.name,
      logo: info.logo,
      introduction: info.introduction,
      feeToken: info.feeToken,
      feeAmount: new BigNumber(info.feeAmount.toJSON().hex).toNumber(),
      validDate: new BigNumber(info.validDate.toJSON().hex).toNumber(),
      perTime: new BigNumber(info.perTime.toJSON().hex).toNumber(),
      ownerPercent: new BigNumber(info.ownerPercent.toJSON().hex).toNumber(),
      authorPercent: new BigNumber(info.authorPercent.toJSON().hex).toNumber(),
      memberPercent: new BigNumber(info.memberPercent.toJSON().hex).toNumber(),
      memberNFTImage: extraInfo.memberNFTImage,
      memberNFTIntroduction: extraInfo.memberNFTIntroduction,
      memberNFTName: extraInfo.memberNFTName,
    };
  } catch (error) {
    console.error(error);
    return {
      name: '',
      logo: '',
      introduction: '',
      feeToken: '',
      feeAmount: '',
      validDate: null,
      perTime: null,
      ownerPercent: null,
      authorPercent: null,
      memberPercent: null,
      nftAddress: '',
      nftid: null,
    };
  }
};

// 部落主nft
export const getTribeNftInfo = async (tribeId: string | number) => {
  const address = getTribeAddress();
  const calls = [
    {
      address,
      name: 'extraTribesInfo',
      params: [tribeId],
    },
    {
      address,
      name: 'extraTribesNFTInfo',
      params: [tribeId],
    },
  ];
  try {
    const [extraTribeInfo, extraNftInfo] = await multicall(tribeAbi, calls);
    return {
      ownerNFTName: extraNftInfo.ownerNFTName,
      ownerNFTIntroduction: extraNftInfo.ownerNFTIntroduction,
      ownerNFTImage: extraNftInfo.ownerNFTImage,
      memberNFTName: extraNftInfo.memberNFTName,
      memberNFTIntroduction: extraNftInfo.memberNFTIntroduction,
      memberNFTImage: extraNftInfo.memberNFTImage,
      claimOnwerNFT: extraTribeInfo.claimOnwerNFT,
      initMemberNFT: extraTribeInfo.initMemberNFT,
    } as TribesNFTInfo;
  } catch (error) {
    console.error(error);
    return {
      claimOnwerNFT: false,
      ownerNFTName: '',
      ownerNFTIntroduction: '',
      ownerNFTImage: '',
      memberNFTName: '',
      memberNFTIntroduction: '',
      memberNFTImage: '',
      initMemberNFT: false,
    };
  }
};

// 查询basic手续费
export const getBasicFee = async () => {
  const address = getTribeAddress();
  const calls = [
    {
      address,
      name: '_join_matter',
      params: [],
    },
  ];
  try {
    const tx = await multicall(tribeAbi, calls);
    return getBalanceNumber(tx[0]);
  } catch (error) {
    return 0;
  }
};

// 查询token是否需要授权
export const getTokenTribeApprove = async (
  account: string,
  address: string,
) => {
  const tribeAddress = getTribeAddress();
  const calls = [
    {
      address,
      name: 'allowance',
      params: [account, tribeAddress],
    },
  ];

  try {
    const matterApprove = await multicall(erc20Abi, calls);
    return matterApprove[0][0].toString();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 授权代币
export const ApproveToken = address => {
  const coinContract = useERC20(address);
  const tribeAddress = getTribeAddress();

  const onApprove = React.useCallback(async () => {
    try {
      const tx = await coinContract.approve(
        tribeAddress,
        ethers.constants.MaxUint256,
      );
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      console.error(e);
      return false;
    }
  }, [coinContract]);

  return { handleApprove: onApprove };
};

// 加入部落
export const JoinTribe = async tribe_id => {
  const tribeAddress = getTribeAddress();
  const bnbAddress = getBnbAddress();
  const calls = [
    {
      address: tribeAddress,
      name: 'joinTribe',
      params: [tribe_id],
    },
  ];
  try {
    const tx = await multicall(tribeAbi, calls);
    return tx[0][0];
  } catch (error) {
    console.error(error);
    return false;
  }
};
