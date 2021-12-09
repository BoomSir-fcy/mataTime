const options = {};
export const stakeNftFarm = async (masterChefContract, address, nftsId) => {
  const tx = await masterChefContract.depositeNFT(address, nftsId);
  const receipt = await tx.wait();
  return receipt.status;
};
export const CancelNftStake = async (masterChefContract, toNFT, tokenID) => {
  const tx = await masterChefContract.replaceNFT(toNFT, tokenID);
  const receipt = await tx.wait();
  return receipt.status;
};
export const RechargeToken = async (masterChefContract, tokenAddress, amount) => {
  const tx = await masterChefContract.chargeToken(tokenAddress, amount);
  const receipt = await tx.wait();
  return receipt.status;
};
export const createUserContact = async (
  masterChefContract,
  nickname,
  nftAddress,
  tokenID,
  InviteAddress
) => {
  const tx = await masterChefContract.createProfile(
    nickname,
    nftAddress,
    tokenID,
    InviteAddress
  );
  const receipt = await tx.wait();
  return receipt.status;
};
export const updateNickname = async (masterChefContract, nickname) => {
  const tx = await masterChefContract.updateNickname(nickname);
  const receipt = await tx.wait();
  return receipt.status;
};
