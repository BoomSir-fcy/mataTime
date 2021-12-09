import { Http } from '../http';

export class AccountApi extends Http {
  async withdraw(params: Api.Account.DrawbalanceSignMessage) {
    const res = await this.post('/v1/wallet/drawbalance', params);
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
    const res = await this.get('v1/wallet/burncointoday');
    if (Http.checkSuccess(res)) {
      return res;
    }
    return null
  }

  // 平均消耗
  async getWalletAverageburntime() {
    const res = await this.get('v1/wallet/averageburntime');
    if (Http.checkSuccess(res)) {
      return res;
    }
    return null
  }
}
