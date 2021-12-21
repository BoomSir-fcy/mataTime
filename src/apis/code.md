friday, [2021/12/20 9:43]
var (
 LogicErrInvalidParams = newLogicError(30_000_001, "invalid parameter")

 // 用户相关
 LogicErrUsers                = newLogicError(30_001_001, "user error.")                          // 用户模块通用错误
 LogicErrFindUser             = newLogicError(30_001_002, "find user failed")                     // 查找用户失败
 LogicErrFindUserLocation     = newLogicError(30_001_003, "user location lookup error")           // 用户所在地查找失败
 LogicErrUpdateUserInfo       = newLogicError(30_001_004, "user information update failed")       // 更新用户信息失败
 LogicErrUserComplain         = newLogicError(30_001_005, "user complain failed")                 // 举报用户失败
 LogicErrUserShieldPost       = newLogicError(30_001_006, "user failed to block post")            // 用户屏蔽帖子失败
 LogicErrUserCancelShieldPost = newLogicError(30_001_007, "User failed to unblock post")          // 用户取消屏蔽帖子失败
 LogicErrUserComplaintPost    = newLogicError(30_001_008, "user complaint about post failure")    // 用户投诉帖子失败
 LogicErrUserComplaintComment = newLogicError(30_001_009, "user complaint about comment failure") // 用户投诉评论失败
 // 上传图片
 LogicErrUploadImg                = newLogicError(30_002_001, "upload image error.")
 LogicErrCheckParamImg            = newLogicError(30_002_002, "upload image check param image error")        // 校验图片格式错误
 LogicErrUploadImgExceedMaxNumber = newLogicError(30_002_003, "uploaded pictures exceed the maximum number") // 批量上传图片超过上限

 // 主题(话题)
 LogicErrTopic             = newLogicError(30_003_001, "topic error.")
 LogicErrTopicNotFound     = newLogicError(30_003_002, "failed to find topic list")                //查找话题列表失败
 LogicErrTopicPostNotFound = newLogicError(30_003_003, "failed to find topic post")                //查找话题帖子失败
 LogicErrHotTopicNotFound  = newLogicError(30_003_004, "failed to get the list of popular topics") //获取热门话题列表失败

 // 帖子(推特)

 LogicErrPOST                   = newLogicError(30_004_001, "post error.") // 未知错误导致发帖失败
 LogicErrPOST_ContentToLong     = newLogicError(30_004_002, fmt.Sprintf("content can not more than %d characters", model.POST_TEXT_CONTENT_MAX_LENGTH)) // 超过最大长度
 LogicErrPOST_ContainPolitics   = newLogicError(30_004_003, "content related to politics")                                                              // 政治
 LogicErrPOST_ContainTerrorism  = newLogicError(30_004_004, "content related to terrorism")                                                             // 暴恐
 LogicErrPOST_ContainPorn       = newLogicError(30_004_005, "content related to porn")                                                                  // 色情
 LogicErrPOST_ContainAbuse      = newLogicError(30_004_006, "content related to abuse")                                                                 // 辱骂
 LogicErrPOST_ContainContraband = newLogicError(30_004_007, "content related to contraband")                                                            // 违禁
 LogicErrPOST_TopicNumLimit     = newLogicError(30_004_008, fmt.Sprintf("topic num can not more than %d", model.POST_TOPIC_MAX_NUM))                    // 操作最大话题数
 LogicErrPOST_ImageNumLimit     = newLogicError(30_004_009, fmt.Sprintf("picture num can not more than %d", model.POST_PICTURE_MAX_NUM))                // 超过最大图片数
 LogicErrPOST_GetTimeReceive    = newLogicError(30_004_010, "get total time error.")      // 请求推文次数过多
 LogicErrPostNotFound           = newLogicError(30_004_011, "get post error")             // 获取推文失败
 LogicErrCreatePost             = newLogicError(30_004_012, "failed to post new tweet")   // 发布新推文失败
 LogicErrPostDetailNotFound     = newLogicError(30_004_013, "failed to get post details") // 获取推文详情失败
 LogicErrPostSetTop             = newLogicError(30_004_014, "failed to set sticky posts") // 设置置顶帖子失败
 LogicErrCancelPostTop          = newLogicError(30_004_015, "failed to unpin posts")      // 取消置顶帖子失败
 LogicErrDeletePost             = newLogicError(30_004_016, "failed to delete post")      //  删除帖子失败

 // 评论
 LogicErrComment         = newLogicError(30_005_001, "comment error.") // 未知错误导致评论失败
 LogicErrCreateComment   = newLogicError(30_005_002, "failed to post new comment") // 发布新评论失败
 LogicErrDeleteComment   = newLogicError(30_005_003, "failed to delelte comment") // 删除评论失败
 LogicErrCommentNotFound = newLogicError(30_005_004, "failed to get the comment list") // 获取评论列表失败
 LogicErrLikeCommentMsg  = newLogicError(30_005_005, "failed to send like comment message") //发送点赞评论消息失败

friday, [2021/12/20 9:43]
// 点赞相关
 LogicErrLike              = newLogicError(30_006_001, "like error.") // 未知错误导致点赞失败
 LogicErrLikePost          = newLogicError(30_006_002, "failed to like post")        //点赞推文失败
 LogicErrUnLikePost        = newLogicError(30_006_003, "failed to cancel like post") // 取消点赞帖子失败
 LogicErrLikeComment       = newLogicError(30_006_004, "failed to like comment") // 未知错误导致点赞评论失败
 LogicErrCancelLikeComment = newLogicError(30_006_005, "failed to cancel the like comment") // 取消点赞评论失败

 // 收藏相关
 LogicErrfav         = newLogicError(30_007_001, "favourite error.") // 未知错误导致收藏失败
 LogicErrPostID      = newLogicError(30_007_002, "cant find post id.") // 无法找到帖子
 LogicErrReadyPost   = newLogicError(30_007_003, "ready add.")         // 已经被收藏
 LogicErrReadyCancel = newLogicError(30_007_004, "ready cancel.")      // 已经取消收藏

 // 关注与粉丝
 LogicErrAttention     = newLogicError(30_008_001, "attention error.") // 未知错误导致关注失败
 LogicErrAttentionSelf = newLogicError(30_008_002, "I can't pay attention to myself.") // 不能关注自己
 LogicErrReadyFollow   = newLogicError(30_008_003, "ready follow.")                    // 已经关注

 // 账号设置
 LogicErrUserSetting            = newLogicError(30_009_001, "user setting error.") // 设置失败
 LogicErrUserSettingUpdateEmpty = newLogicError(30_009_002, "update data empty!.") // 无更新数据
 // 消息列表
 LogicErrMessage          = newLogicError(30_010_001, "message error.") // 获取消息失败
 LogicErrMessageErrMsgID  = newLogicError(30_010_002, "message id can't empty.") // 无法找到消息
 LogicErrMessageReadyRead = newLogicError(30_010_003, "message ready read..")    // 消息已经阅读

 // 钱包接口
 LogicErrWallet        = newLogicError(30_011_001, "wallet error.") // 服务器错误
 LogicErrTimeNotEnough = newLogicError(30_011_002, "insufficient time balance") // time 不足
 // 打赏
 LogicErrReward = newLogicError(30_012_001, "reward error.")
 // 任务
 LogicErrTask                = newLogicError(30_013_001, "task error.") // 服务器错误
 LogicErrTaskSign            = newLogicError(30_013_002, "sign in failed")                                     //签到失败
 LogicErrTaskReceive         = newLogicError(30_013_003, "failed to claim task")                               //领取任务失败
 LogicErrTaskNotFound        = newLogicError(30_013_004, "failed to get task list")                            //任务状态列表不存在
 LogicErrTaskHistosyNotFOund = newLogicError(30_013_005, "failed to obtain historical mission revenue record") //任务历史收益记录不存在
 // admin
 LogicErrAdmin = newLogicError(30_014_001, "admin error.")
)
