import { createAction } from '@reduxjs/toolkit';
import { SearchUserInfo, SearchTopicInfo, SearchHistoryList } from './types'

export const setSearchDisplayPeople = createAction<{
  list: SearchUserInfo[],
}>('search/setSearchDisplayPeople')

export const setSearchDisplayTopic = createAction<{
  list: SearchTopicInfo[],
}>('search/setSearchDisplayTopic')

interface UpdatePeopleState extends Partial<SearchUserInfo> {
  uid: number

}

export const updatePeopleState = createAction<UpdatePeopleState>('search/updatePeopleState')

export const addSearchHistoryData = createAction<SearchHistoryList>('search/history/add')
export const removeSearchHistoryData = createAction<string>('search/history/remove')
export const clearSearchHistoryData = createAction('search/history/clear')

export const changeSearchUserFilter = createAction<number>('search/filter/user')
