import { SignInApi } from "./SignIn";
import { UserApi } from "./User";
import { NewsApi } from './News';
import { HomeApi } from './Home';
import { CommentApi } from './Comment';

const isSuccess = (res: Api.Error) => {
  return res && res.code === 1;
};

export const Api = {
  isSuccess: isSuccess,
  SignInApi: new SignInApi(),
  UserApi: new UserApi(),
  NewsApi: new NewsApi(),
  HomeApi: new HomeApi(),
  CommentApi: new CommentApi()
};