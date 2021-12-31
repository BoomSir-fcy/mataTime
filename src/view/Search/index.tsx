import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Text, Flex, Empty, Spinner } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { Crumbs, UserFlowItem, HoverLink } from 'components'
import SearchInput from 'components/SearchInput'
import SearchTopicItem from 'components/SearchInput/SearchTopicItem'
import SearchUserItem from 'components/SearchInput/SearchUserItem'
import Tabs from 'components/Tabs'
import { storeAction, useStore } from 'store'
import { useDispatch } from 'react-redux'
import { BASE_USER_PROFILE_URL } from 'config'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useHistory } from 'react-router-dom'
import { getSearchPath } from 'utils/urlQueryPath'

const tabDatas = [
  {
    lable: 'People',
    tLable: 'People',
    type: 'user',
  },
  {
    lable: 'Topic',
    tLable: 'Topic',
    type: 'topic',
  },
]

const Search = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const parsedQs = useParsedQueryString();
  const { replace } = useHistory()

  const {
    displayResultListOfPeoples,
    displayResultListOfTopic,
    dispalyLoading,
    filterUser,
  } = useStore(p => p.search);

  const [activeType, setActiveType] = useState(tabDatas[0].type)

  useEffect(() => {
    if (parsedQs.f) {
      setActiveType(parsedQs.f)
    }
  }, [parsedQs.f])

  const userList = useMemo(() => {
    if (filterUser === 2) return displayResultListOfPeoples.filter(item => item.is_attention)
    return displayResultListOfPeoples
  }, [filterUser, displayResultListOfPeoples])

  return (
    <Box>
      <Crumbs
        top
        back
        zIndex={1005}
        hideBorder={false}
        callBack={() => {

        }}
        title={t('homeHeaderTitle')}
      >
        <Flex alignItems='center' flex='1' >
          <SearchInput ml='44px' width='100%' />
          {/* <Box width="100%">
          </Box> */}
        </Flex>
      </Crumbs>
      <Box>
        <Tabs
          pl='16px'
          pb='8px'
          mt='12px'
          keys='type'
          active={activeType}
          datas={tabDatas}
          onChange={(tab) => {
            replace(getSearchPath({
              ...parsedQs,
              f: tab.type
            }))
            setActiveType(tab.type)
          }}
        />
        {
          dispalyLoading
            ?
            <Spinner />
            :
            (
              <Box>
                <Box>
                  {
                    activeType === tabDatas[0].type && userList.map(item => {
                      return (
                        // <SearchUserItem
                        //   uid={item.uid}
                        //   user_avator_url={item.nft_image}
                        //   nick_name={item.nick_name}
                        //   avatarCallback={undefined}
                        // />
                        <HoverLink to={`${BASE_USER_PROFILE_URL}${item.uid}`}>
                          <UserFlowItem
                            padding="10px 29px 10px 19px"
                            uid={item.uid}
                            key={`u_${item.uid}`}
                            address={item.address}
                            is_attention={item.is_attention}
                            nft_image={item.nft_image}
                            introduction={item.introduction}
                            nick_name={item.nick_name}
                            onChanges={(is_attention) => {
                              dispatch(storeAction.updatePeopleState({
                                uid: item.uid,
                                is_attention
                              }))
                            }}
                          />
                        </HoverLink>
                      )
                    })
                  }
                  {
                    activeType === tabDatas[0].type && userList.length === 0 && (
                      <Empty />
                    )
                  }
                </Box>
                <Box>
                  {
                    activeType === tabDatas[1].type && displayResultListOfTopic.map(item => {
                      return (
                        <SearchTopicItem key={`t_${item.topic_id}`} id={item.topic_id} post_num={item.post_num} name={item.topic_name} />
                      )
                    })
                  }
                  {
                    activeType === tabDatas[1].type && displayResultListOfTopic.length === 0 && (
                      <Empty />
                    )
                  }
                </Box>
              </Box>
            )
        }
      </Box>
    </Box>
  )
}

export default Search
