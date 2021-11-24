import { Http } from "../http";

export class NewsApi extends Http {
  // 消息列表
  async getMessageList(message_type: number, page: number, perpage: number = 10, add_Time:string|null|undefined = null) {
    const res = await this.get('/v1/message/list', { message_type, page, perpage,add_Time });
    return res;
  }

  // 将消息变为已读
  async getMessageRead(type: number) {
    const res = await this.get('/v1/message/read', { type });
    return res;
  }

  // 未读消息数量
  async getUnreadMsgNum() {
    const res = await this.get('/v1/message/unread_msg_num');
    return res;
  }

}
