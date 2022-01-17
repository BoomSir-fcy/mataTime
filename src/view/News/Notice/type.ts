export enum MessageType {
  MessageAtMe = 1, // @相关消息
  MessageComment = 2, // 评论相关消息
  MessageLike = 3, // 点赞相关消息
  MessageSecret = 4, // 私信消息
  MessageSystem = 5, // 系统消息
  MessageSystemMute = 6, // 禁言
  MessageSystemUnMute = 7, // 解禁
  MessageSystemShieldPost = 8, // 屏蔽帖子
  MessageSystemRechargeSuccess = 9, // 充值成功
  MessageSystemRewardSuccess = 10, // 打赏成功
  MessageSystemWithdrawalSuccess = 11, // 提取成功
  MessageSystemAddTag = 12, // 添加用户标签
  MessageSystemUpdateTag = 13, // 修改用户标签
  MessageSystemDeleteTag = 14, // 删除用户标签
}


