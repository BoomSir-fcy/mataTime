import { ChainId } from 'config/wallet/config';
import addresses from 'config/constants/contracts';
import { Address } from 'config/constants/types';

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return address[chainId] ? address[chainId] : address[ChainId.BSC_MAINNET];
};

export const getTestAddress = () => {
  return getAddress(addresses.test);
};

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall);
};

export const getNftSocialAddress = () => {
  return getAddress(addresses.nftSocial);
};

export const getTimeShopAddress = () => {
  return getAddress(addresses.TimeShop);
};

export const getDsgAddress = () => {
  return getAddress(addresses.DsgToken);
};

export const getTimeAddress = () => {
  return getAddress(addresses.TimeToken);
};

export const getMatterAddress = () => {
  return getAddress(addresses.MatterToken);
};

export const getOracleAddress = () => {
  return getAddress(addresses.oracle);
};

export const getLiquidityPool = () => {
  return getAddress(addresses.liquidityPool);
};

export const getSinglePool = () => {
  return getAddress(addresses.MutiRewardPool);
};

export const getCashierDeskAddress = () => {
  return getAddress(addresses.CashierDesk);
};

export const getRewardAuthorAddress = () => {
  return getAddress(addresses.RewardAuthor);
};

export const getBnbAddress = () => {
  return getAddress(addresses.Wbnb);
};

export const getInvitationAddress = () => {
  return getAddress(addresses.Invitation);
};
export const getDsgAvatarNftAddress = () => {
  return getAddress(addresses.ExPhotoNft);
};

export const getTicketNftAddress = () => {
  return getAddress(addresses.ticketsPhotoNft);
};

export const getExPhotoAddress = () => {
  return getAddress(addresses.ExPhoto);
};

export const getDsgafAddress = () => {
  return getAddress(addresses.dsgaf);
};
