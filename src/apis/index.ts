import { SignInApi } from "./SignIn";

const isSuccess = (res) => {
  return res && res.code === 1;
};

export const Api = {
  isSuccess: isSuccess,
  SignInApi: new SignInApi(),
};