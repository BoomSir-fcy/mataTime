
const options = {}
export const stakeNftFarm = async (masterChefContract, address, nftsId) => {
  const tx = await masterChefContract.depositeNFT(address, nftsId)
  const receipt = await tx.wait()
  return receipt.status
}
export const CancelNftStake = async (masterChefContract, address, nftsId) => {
  const tx = await masterChefContract.replaceNFT(address, nftsId)
  const receipt = await tx.wait()
  return receipt.status
}