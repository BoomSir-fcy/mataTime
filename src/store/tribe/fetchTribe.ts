import tribeAbi from 'config/abi/tribe.json';
import { getTribeAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';

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
