import { Http } from '../http';

export class AccountApi extends Http {
  async withdraw(params: Api.Account.DrawbalanceSignMessage) {
    const res = await this.post('/v2/wallet/withdrawbalance', params);
    return res;
  }

  async balance() {
    const res = await this.get('/v1/wallet/balance');
    return res;
  }

  async history(params?: Api.Account.History) {
    const res = await this.get('/v1/wallet/chargeandwithdraw', params);
    return res;
  }

  // 最小提币数量
  async getMinimum() {
    const res = await this.get('/v1/wallet/get_withdraw_minimum');
    return res;
  }

  // 手续费
  async getWithdrawFee() {
    const res = await this.get('/v1/wallet/get_withdraw_fee');
    return res;
  }

  async TimeIncomerecord(params?: Api.Account.TimeIncomerecord) {
    const res = await this.get('/v1/wallet/incomerecord', params);
    return res;
  }

  async TimeIncometoday(params?: Api.Account.TimeIncometoday) {
    const res = await this.get('/v1/wallet/incometoday', params);
    return res;
  }

  async MatterIncomerecord(params?: Api.Account.TimeIncomerecord) {
    const res = await this.get('/v1/task/matter-history', params);
    return res;
  }

  async MatterIncometoday(params?: Api.Account.TimeIncometoday) {
    const res = await this.get('/v1/task/matter-income', params);
    return res;
  }

  async getRewardList(params?: any) {
    const res = await this.get('/v1/reward/reward-author/list', params);
    return res;
  }

  async getIncome() {
    const res = await this.get('/v1/reward/reward-author/user-stat');
    return res;
  }

  // 今日 消耗
  async getWalletBurncointoday() {
    const res: Api.Response<string> = await this.get('v1/wallet/burncointoday');
    if (Http.checkSuccess(res)) {
      return res.data;
    }
    return null;
  }

  // 平均消耗
  async getWalletAverageburntime() {
    const res: Api.Response<string> = await this.get(
      'v1/wallet/averageburntime',
    );
    if (Http.checkSuccess(res)) {
      return res.data;
    }
    return null;
  }
}
