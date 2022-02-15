import { useWeb3React } from '@web3-react/core';
import { useERC721 } from 'hooks/useContract';
import { useCallback, useEffect, useState } from 'react';
import { TribeBaseInfo } from 'store/tribe/type';
import {
  getTribeAddress,
  getTribeTicketsNFTAddress,
} from 'utils/addressHelpers';
import { getTribeContract } from 'utils/contractHelpers';
import multicall from 'utils/multicall';

// 授权部落门票nft
export const ApproveTribeTicketsNFT = async (tokenId: number) => {
  const tribeTicketsNFTAddress = getTribeTicketsNFTAddress();
  const tribeAddress = getTribeAddress();
  const { getErc721Contract } = useERC721(tribeTicketsNFTAddress);
  try {
    const tx = await getErc721Contract.approve(tribeAddress, tokenId);
    const receipt = await tx.wait();
    return receipt.status;
  } catch (error) {
    throw error;
  }
};

export const useTribe = () => {
  const tribeContract = getTribeContract();
  const { account } = useWeb3React();
  const [nftTokenList, setNftTokenList] = useState([]);

  useEffect(() => {
    if (account) {
      getNftTokenList();
    }
  }, [account]);

  const getNftTokenList = useCallback(async () => {
    try {
      // const tokenList = await tribeContract.listViewNFTToken();
      // setNftTokenList(tokenList);
      setNftTokenList(['0x9fcaCa63afD8DA8Fc3E00A4D0ef4a54ac0AAE625']);
    } catch (error) {
      console.log(error);
    }
  }, [tribeContract]);

  const CheckUniqueName = useCallback(async (name: string) => {
    try {
      const unique = await tribeContract.unique_name(name);
      return unique;
    } catch (error) {
      return true;
    }
  }, []);

  const CreateTribe = useCallback(async (tribeInfo: TribeBaseInfo) => {
    try {
      const rs = await tribeContract.createTribe(tribeInfo);
      console.log('创建部落返回值----》', rs);
      return rs;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    onCheckUniqueName: CheckUniqueName,
    onCreateTribe: CreateTribe,
    nftTokenAddress: nftTokenList,
  };
};
