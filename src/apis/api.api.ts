import { SignInApi } from "./SignIn";
import { UserApi } from "./User";
import { NewsApi } from './News';
import { ContentApi } from './Content';
import { HomeApi } from './Home';
import { CommentApi } from './Comment';
import { CommonApi } from './Common';
import { CoinsApi } from './Coins';
import { MeApi } from './Me';
import { SetApi } from './Set';
import { AttentionApi } from './Attention';
import { AccountApi } from './Account';
import { TaskApi } from './Task';

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
  CoinsApi: new CoinsApi(),
  MeApi: new MeApi(),
  SetApi: new SetApi(),
  AttentionApi: new AttentionApi(),
  AccountApi: new AccountApi(),
  TaskApi: new TaskApi()
};