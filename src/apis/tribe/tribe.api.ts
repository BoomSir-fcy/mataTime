import { Http } from '../http';

export class SetApi extends Http {
  // 部落列表
  async tribeList(params: Api.Tribe.tribeListParams) {
    const res = await this.get('/v1/tribe/list', params);
    return res;
  }
}
