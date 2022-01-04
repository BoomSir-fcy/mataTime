import { ethers } from 'ethers';
import { simpleRpcProvider } from 'utils/providers';
import dsgnftAbi from 'config/abi/dsgnft.json';
import nftSocialAbi from 'config/abi/nftSocial.json';
import rewardAuthorAbi from 'config/abi/RewardAuthor.json';
import timeShopAbi from 'config/abi/TimeShop.json';
import MutiRewardPoolAbi from 'config/abi/MutiRewardPool.json';

// Addresses
import {
  getAddress,
  getLiquidityPool,
  getMulticallAddress,
  getNftSocialAddress,
  getSinglePool,
  getTimeShopAddress,
  getCashierDeskAddress,
  getRewardAuthorAddress,
  getInvitationAddress,
  getExPhotoAddress,
  getTicketNftAddress,
} from 'utils/addressHelpers';

// ABI
import bep20Abi from 'config/abi/erc20.json';
import erc721Abi from 'config/abi/erc721.json';
import MultiCallAbi from 'config/abi/Multicall.json';
import CashierDeskAbi from 'config/abi/CashierDesk.json';
import InvitationAbi from 'config/abi/Invitation.json';
import ExPhotoAbi from 'config/abi/exphoto.json';
import mysteryBoxAbi from 'config/abi/mysteryBox.json';

const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getBep20Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(bep20Abi, address, signer);
};
export const getErc721Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(erc721Abi, address, signer);
};

export const getMulticallContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer);
};

export const getDsgNftContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(dsgnftAbi, address, signer);
};

export const getErc20EarnNftPoolContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(nftSocialAbi, getNftSocialAddress(), signer);
};

export const getRewardAuthorContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(rewardAuthorAbi, getRewardAuthorAddress(), signer);
};

export const getTimeShopContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(timeShopAbi, getTimeShopAddress(), signer);
};

export const getLiquidityPoolContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(nftSocialAbi, getLiquidityPool(), signer);
};

export const getSinglePoolContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(MutiRewardPoolAbi, getSinglePool(), signer);
};

export const getCashierDeskContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(CashierDeskAbi, getCashierDeskAddress(), signer);
};

export const getInvitationContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(InvitationAbi, getInvitationAddress(), signer);
};

export const getExPhotoContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(ExPhotoAbi, getExPhotoAddress(), signer);
};
export const getTicketNftContract = (
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(mysteryBoxAbi, getTicketNftAddress(), signer);
};
