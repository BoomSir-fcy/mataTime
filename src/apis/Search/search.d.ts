declare namespace Api {
  namespace News {
    interface UnreadMsgNum {
      message_at_me: number; // @我的消息
      message_comment: number; // 评论的消息
      message_like: number; //  点赞的消息
      message_secret: number; // 私信消息
      message_system: number; // 系统消
      message_forward: number; // 转发消息
    }
  }
}
