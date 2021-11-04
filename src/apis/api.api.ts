import { SignInApi } from "./SignIn";
import { UserApi } from "./User";
import { NewsApi } from './News';
import { ContentApi } from './Content';
import { HomeApi } from './Home';
import { CommentApi } from './Comment';
import { CommonApi } from './Common';
import { MeApi } from './Me';
import { AttentionApi } from './Attention';

const isSuccess = (res: Api.Error) => {
  return res && res.code === 1;
};

export const Api = {
  isSuccess: isSuccess,
  SignInApi: new SignInApi(),
  UserApi: new UserApi(),
  NewsApi: new NewsApi(),
  HomeApi: new HomeApi(),
  CommentApi: new CommentApi(),
  CommonApi: new CommonApi(),
  ContentApi: new ContentApi(),
  MeApi: new MeApi(),
  AttentionApi: new AttentionApi()
};