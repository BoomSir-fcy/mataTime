import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { getTimeShopAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import timeShopAbi from 'config/abi/TimeShop.json';
import { TOTALDSG, TOTALTIME } from 'utils/TimeShopNumber';

const FetchTimeShopInfo = async () => {
  const TimeShop = getTimeShopAddress();
  const calls = [
    {
      address: TimeShop,
      name: 'getViews',
    },
  ];
  try {
    const Views = await multicall(timeShopAbi, calls);
    const info = Views[0][0].map((item, index) => ({
      total_dsg: new BigNumber(item.total_dsg.toJSON().hex),
      max_dsg_token: new BigNumber(item.max_dsg_token.toJSON().hex),
      max_time_token: new BigNumber(item.max_time_token.toJSON().hex),
    }));
    return info;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 获取兑换池余额
export const useTimeShopBalance = () => {
  const [ShopBalance, setShopBalance] = useState('');
  var total_dsg = new BigNumber(0);
  var totalDsg_token = new BigNumber(0);
  var totalTime_token = new BigNumber(0);
  const getTotalRedeemedDsg = async () => {
    const List = await FetchTimeShopInfo();
    for (let i = 0; i < List.length; i++) {
      total_dsg = total_dsg.plus(List[i].total_dsg);
      totalDsg_token = totalDsg_token.plus(List[i].max_dsg_token);
      totalTime_token = totalTime_token.plus(List[i].max_time_token);
    }
    const num = totalTime_token
      .minus(totalTime_token.times(total_dsg.div(totalDsg_token)))
      .toString();
    setShopBalance(num);
  };
  useEffect(() => {
    getTotalRedeemedDsg();
  }, []);
  return ShopBalance;
};
export default useTimeShopBalance;
