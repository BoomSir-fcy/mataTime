import { Http } from '../http';

export class SignInApi extends Http {
  async signIn(params: Api.SignIn.LoginSignMessage) {
    const res = await this.post('/v1/sign/signin', params);
    return res;
  }

  async signUp(params: Api.SignIn.LoginSignMessage) {
    const res: any = await this.post('/v1/sign/signup', params);
    return res;
  }

  async signVerify(address: string) {
    const res = await this.get('/v1/sign/verify', { address });
    return res;
  }

  async getNft(network: number, address?: string) {
    const res: Api.SignIn.nftCallback = await this.get('/v1/sign/nfturl', { address, network });
    return res;
  }
}
