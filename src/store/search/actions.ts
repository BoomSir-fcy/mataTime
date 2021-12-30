import { createAction } from '@reduxjs/toolkit';
import { SearchUserInfo, SearchTopicInfo } from './types'

export const setSearchDisplayPeople = createAction<{
  list: SearchUserInfo[],
}>('search/setSearchDisplayPeople')

export const setSearchDisplayTopic = createAction<{
  list: SearchTopicInfo[],
}>('search/setSearchDisplayTopic')