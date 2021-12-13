import { Api } from 'apis';


// Matter收益记录
export const FetchMatterIncomeList = async (page, size) => {
  try {
    const res = await Api.AccountApi.MatterIncomerecord({ index: page, size })
    if (Api.isSuccess(res)) {
      return res.data
    } else {
      throw new Error("errCode");
    }
  } catch (error) {
    console.error(error);
    throw error
  }
}

// Matter今日收益和K线记录
export const FetchMatterIncometoday = async (days) => {
  try {
    const res = await Api.AccountApi.MatterIncometoday({ days })
    if (Api.isSuccess(res)) {
      return res.data
    } else {
      throw new Error("errCode");
    }
  } catch (error) {
    console.error(error);
    throw error
  }
}