import tribeAbi from 'config/abi/tribe.json';
import { getTribeAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import { TribesNFTInfo } from './type';

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
    const tokens = await multicall(tribeAbi, calls);
    return tokens[0][0];
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
    console.log(tribeId);

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
