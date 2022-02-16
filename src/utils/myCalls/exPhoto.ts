import BigNumber from 'bignumber.js';
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config';

const options = {
  // gasLimit: DEFAULT_GAS_LIMIT,
};

export const exchangeToPhtot = async (
  masterChefContract,
  nickname,
  code,
  created,
  color,
) => {
  const tx = await masterChefContract.exchange(nickname, code, created, color);
  const receipt = await tx.wait();
  return receipt.status;
};

export const exchangeAndBuyToPhtot = async (
  masterChefContract,
  created,
  color,
  value,
) => {
  const tx = await masterChefContract.Exchange_NFT(created, color, {
    value,
  });
  const receipt = await tx.wait();
  return receipt.status;
};

export const lockInviteCode = async (
  masterChefContract,
  code,
) => {
  const tx = await masterChefContract.lockCode(code);
  const receipt = await tx.wait();
  return receipt.status;
};

export const buyTicketNft = async (masterChefContract, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();
  const tx = await masterChefContract.buyTicketNFT(amount);
  const receipt = await tx.wait();
  return receipt.status;
};
