import { Http } from "../http";

export class AttentionApi extends Http {
  // 关注用户
  async onAttentionFocus(focus_uid: number) {
    const res = await this.get('/v1/attention/focus', { focus_uid });
    return res;
  }
}
