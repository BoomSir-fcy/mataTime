
const options = {
  gasLimit: 500000,
}

export const buyMysteryBox = async (masterChefContract, factoryId, amount) => {
  const tx = await masterChefContract.buy(factoryId, amount)
  const receipt = await tx.wait()
  return receipt.status
}

export const openMysteryBox = async (masterChefContract, boxId) => {
  const tx = await masterChefContract.openBox(boxId, options)
  const receipt = await tx.wait()
  const upgradeEvent = receipt.events.find((item) => item.event === 'OpenBox')
  return upgradeEvent?.args || []
}
