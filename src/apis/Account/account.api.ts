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
}
