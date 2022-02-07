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
export const RechargeToken = async (
  masterChefContract,
  tokenAddress,
  amount,
  ChainToken,
) => {
  let tx;
  if (ChainToken) {
    tx = await masterChefContract.chargeChainToken({
      value: amount,
    });
  } else {
    tx = await masterChefContract.chargeToken(tokenAddress, amount);
  }
  const receipt = await tx.wait();
  return receipt.status;
};
export const createUserContact = async (
  masterChefContract,
  nickname,
  nftAddress,
  tokenID,
  InviteAddress,
) => {
  const tx = await masterChefContract.createProfile(
    nickname,
    nftAddress,
    tokenID,
    InviteAddress,
  );
  const receipt = await tx.wait();
  return receipt.status;
};

export const updateNickname = async (masterChefContract, nickname) => {
  const tx = await masterChefContract.updateNickname(nickname);
  const receipt = await tx.wait();
  return receipt.status;
};

export const RewardAuthorContactReward = async (
  masterChefContract,
  target,
  token,
  postType,
  postId,
  amount,
  bool,
) => {
  const tx = await masterChefContract.reward(
    target,
    token,
    postType,
    postId,
    amount,
    {
      value: !bool ? '' : amount,
    },
  );
  const receipt = await tx.wait();
  return receipt.status;
};
