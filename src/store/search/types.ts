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

export interface SearchTextInfo {
  text: string
  searchId: string
}


export enum SearchHistiryType {
  USER,
  TOPIC,
  TEXT,
}

export interface SearchHistoryList extends Partial<SearchUserInfo>, Partial<SearchTopicInfo>, Partial<SearchTextInfo> {
  type: SearchHistiryType,
}


export interface SearchState {
  resultListOfPeoples: SearchUserInfo[],
  displayResultListOfPeoples: SearchUserInfo[],
  resultListOfTopic: SearchTopicInfo[],
  displayResultListOfTopic: SearchTopicInfo[],
  resultListOfPost: Api.Home.post[],
  resultListOfPostLen: number,
  displayResultListOfPost: Api.Home.post[],
  loading: boolean,
  dispalyLoading: boolean,
  postLoading: boolean,
  errorMsg: string,
  searchVal: string,
  historyList: SearchHistoryList[],
  placeHolderSearch: string,
  filterUser: number // 1 所有人 2 仅关注
}