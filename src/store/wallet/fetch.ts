import { Api } from 'apis';
import { getMatterAddress, getTribeTicketsAddress } from 'utils/addressHelpers';
import { getBep20Contract, getTribeTicketsContract } from 'utils/contractHelpers';
import multicall from 'utils/multicall';
import TribeTicketsAbi from 'config/abi/TribeTickets.json';

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
    const address = getTribeTicketsAddress();
    const matterAddress = getMatterAddress()
    const metterContract = getBep20Contract(matterAddress)

    const calls = [
      {
        address,
        name: 'max_tickets',
        params: [],
      },
      {
        address,
        name: '_price',
        params: [],
      },
    ];
    const [max_tickets, _price] = await multicall(TribeTicketsAbi, calls);

    let allowance = '0';
    if (account) {
      const allowanceRes = await metterContract.allowance(account, address);
      allowance = allowanceRes.toString();
    }
    return {
      price: _price[0].toString(),
      allowance,
      max_tickets: max_tickets[0].toString(),
    }

  } catch (error) {
    console.log(error)
    return {
      price: '0',
      allowance: '0',
      max_tickets: '0',
    }
  }
}