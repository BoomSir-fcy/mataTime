import { Http } from '../http';

export class AccountApi extends Http {
  async withdraw(params: Api.Account.DrawbalanceSignMessage) {
    const res = await this.post('/v1/wallet/drawbalance', params);
    return res;
  }

  async signUp(params: Api.SignIn.LoginSignMessage) {
    const res: any = await this.post('/v1/wallet/drawbalance', params);
    return res;
  }

  async balance() {
    const res = await this.get('/v1/wallet/balance');
    return res;
  }

  async getNft(network: number, address?: string) {
    const res: Api.SignIn.nftCallback = await this.get('/v1/sign/nfturl', { address, network });
    return res;
  }
}
