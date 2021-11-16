import { Http } from '../http';

export class SetApi extends Http {
  // 偏好设置
  async likeSet(params: Api.Set.likeSetParams) {
    const res = await this.post('/v1/setting/preference', params);
    return res;
  }
  // 更新邮箱
  async updateEmail(email: string) {
    const res = await this.post('v1/setting/email', email);
    return res;
  }
}
