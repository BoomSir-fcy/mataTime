import { Api } from 'apis';
import { getMatterAddress } from 'utils/addressHelpers';
import { getBep20Contract, getTribeTicketsContract } from 'utils/contractHelpers';

// Matter收益记录
export const FetchMatterIncomeList = async (page, size) => {
  try {
    const res = await Api.AccountApi.MatterIncomerecord({ index: page, size });
    if (Api.isSuccess(res)) {
      return res.data;
    } else {
      throw new Error('errCode');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Matter今日收益和K线记录
export const FetchMatterIncometoday = async days => {
  try {
    const res = await Api.AccountApi.MatterIncometoday({ days });
    if (Api.isSuccess(res)) {
      return res.data;
    } else {
      throw new Error('errCode');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Time Matter最小提币数量 && 手续费
export const FetchMinimum = async () => {
  try {
    const [min, fee] = await Promise.all([
      Api.AccountApi.getMinimum(),
      Api.AccountApi.getWithdrawFee(),
    ]);
    if (Api.isSuccess(min) || Api.isSuccess(fee)) {
      return {
        ...min.data,
        ...fee.data,
      };
    } else {
      throw new Error('errCode');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTribeTicketInfo = async (account?: string) => {
  try {
    const contract = getTribeTicketsContract()
    // const erc20 =
    const matterAddress = getMatterAddress()
    const metterContract = getBep20Contract(matterAddress)
    
    const res = await contract._price();

    let allowance = '0';
    if (account) {
      const allowanceRes = await metterContract.allowance(account, contract.address);
      allowance = allowanceRes.toString();
    }

    return {
      allowance,
      price: res.toString(),
    }

  } catch (error) {
    return {
      price: '0',
      allowance: '0',
    }
  }
}
