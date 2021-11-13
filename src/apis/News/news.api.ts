import { Http } from "../http";

export class NewsApi extends Http {
  // 消息列表
  async getMessageList(message_type: number, page: number, perpage: number = 10) {
    const res = await this.get('/v1/message/list', { message_type, page, perpage });
    return res;
  }

  // 将消息变为已读
  async getMessageRead(message_ids: number) {
    const res = await this.get('/v1/message/read', { message_ids });
    return res;
  }

  // 未读消息数量
  async getUnreadMsgNum() {
    const res = await this.get('/v1/message/unread_msg_num');
    return res;
  }

}
