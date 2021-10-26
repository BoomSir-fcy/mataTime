import { Http } from "../http";

export class SignInApi extends Http {

  async signIn(params: Api.SignIn.LoginSignMessage) {
    const res = await this.post('/v1/sign/signin', params)
    return res
  }

  async signUp(params: Api.SignIn.LoginSignMessage) {
    const res = await this.post('/v1/sign/signup', params)
    return res
  }

}