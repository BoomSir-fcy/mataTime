MessageAtMe = 1; // @相关消息
MessageComment = 2; // 评论相关消息
MessageLike = 3; // 点赞相关消息
MessageSecret = 4; // 私信消息
MessageSystem = 5; // 系统消息
MessageSystemMute = 6; // 禁言
MessageSystemUnMute = 7; // 解禁
MessageSystemShieldPost = 8; // 屏蔽帖子

interface messageType {
  type: 6 | 7 | 8;
}
