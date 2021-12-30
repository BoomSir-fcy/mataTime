export interface SearchUserInfo {
  display_format: number // 显示的格式
  introduction: string // 介绍
  location: number // 所在地
  nft_image: string // nft图像
  nick_name: string // 昵称
  status: number // 
  uid: number
  address: string
  is_attention: boolean // 是否关注
}

export interface SearchTopicInfo {
  topic_name: string
  topic_id: number
  post_num: number
}

export interface SearchState {
  resultListOfPeoples: SearchUserInfo[],
  displayResultListOfPeoples: SearchUserInfo[],
  resultListOfTopic: SearchTopicInfo[],
  displayResultListOfTopic: SearchTopicInfo[],
  loading: boolean,
  errorMsg: string,
  historyList: string[],
  placeHolderSearch: string,
}