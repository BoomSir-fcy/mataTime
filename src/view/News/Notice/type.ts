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
  MessageSystemReceivedReward = 15, // 获得的打赏
  MessageSystemWithdrawalFail = 16, // 提取失败
  MessageSystemDeleteTribeMember = 19, // 删除部落成员
  MessageTribeReportSuccess = 20, // 举报成功
  MessageTribePostViolation = 21, // 部落帖子违规
  MessageTribeViolation = 22, // 部落违规
  MessageTribeReportFailed = 23, // 举报失败
  MessageTribeViolationFinish = 24, // 部落违规处理完成
}

// 违规原因
export const Violation = {
  1: 'ViolationReasonText1',
  2: 'ViolationReasonText2',
  3: 'ViolationReasonText3',
  4: 'ViolationReasonText4',
  5: 'ViolationReasonText5',
  6: 'ViolationReasonText6',
  7: 'ViolationReasonText7',
  8: 'ViolationReasonText8',
};
