import { Http } from '../http';

export class UserApi extends Http {
  // 添加昵称
  async addNickName(nick_name: string) {
    const res = await this.post('/v1/user/nickname', { nick_name });
    return res;
  }

  // 获取个人信息
  async getUserInfo() {
    const res: Api.User.userInfoCallback = await this.get('/v1/user/userinfo');
    return res;
  }

  // 修改个人信息
  async updateUserInfo(params: Api.User.userInfoParams) {
    const res = await this.post('/v1/user/reviseuserinfo', params);
    return res;
  }

  // 获取所在地
  async getLocation() {
    const res = await this.get('/v1/user/location');
    return res;
  }

  // 可能感兴趣的人
  async referrerMans(params: Api.User.referrerMans) {
    const res = await this.get('/v1/user/interest', params);
    return res;
  }

  // 通过用户Id获取用户详情
  async getUserInfoByUID(uid: string | number) {
    const res = await this.get('/v1/user/userinfo', { uid });
    return res;
  }

  // 通过名字模糊搜索用户
  async searchUser(name: string) {
    const res = await this.get('/v1/user/search_by_name', { name });
    return res;
  }
}
