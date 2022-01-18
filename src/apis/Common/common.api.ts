import { Http } from "../http";

export class CommonApi extends Http {
  // 上传图片
  async uploadImg(params: Api.Common.uploadImg) {
    const res = await this.post('/v1/upload/img', params);
    return res;
  }
  // 上传多张图片
  async uploadImgList(params: Api.Common.uploadImg) {
    const res = await this.post('/v1/upload/img_multi', params);
    return res;
  }

  // 获取websocket的token
  async getWsUrl() {
    const res: Api.Response<Api.Common.WebSocketToken> = await this.get('/v1/getws', undefined, { hideHttpError: true });
    if (Http.checkSuccess(res)) {
      return res.data
    }
    return {
      token: '',
      expires: 0,
    }
  }
}
