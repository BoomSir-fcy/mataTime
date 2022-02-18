import {
  getTribeAddress,
  getTribeNFTAddress,
  getTribeTicketsNFTAddress,
} from 'utils/addressHelpers';
import erc721NewAbi from 'config/abi/erc721New.json';
import multicall from 'utils/multicall';

// 是否授权质押nft
export const getIsApproveStakeNft = async (
  account: string,
): Promise<boolean> => {
  const tribeNFTAddress = getTribeNFTAddress();
  const tribeAddress = getTribeAddress();
  const calls = [
    {
      address: tribeNFTAddress,
      name: 'isApprovedForAll',
      params: [account, tribeAddress],
    },
  ];
  try {
    const [isApproveAll] = await multicall(erc721NewAbi, calls);
    return isApproveAll[0];
  } catch (error) {
    console.error(error);
    return false;
  }
};
