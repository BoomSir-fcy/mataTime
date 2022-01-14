import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Box, Text, Flex, Empty, Spinner } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Crumbs, UserFlowItem, HoverLink } from 'components';
import SearchInput from 'components/SearchInput';
import SearchTopicItem from 'components/SearchInput/SearchTopicItem';
import SearchUserItem from 'components/SearchInput/SearchUserItem';
import Tabs from 'components/Tabs';
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { BASE_USER_PROFILE_URL } from 'config';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useHistory } from 'react-router-dom';
import { getDecodeValue, getSearchPath } from 'utils/urlQueryPath';
import PostResult from './PostResult';
import useDebounce from 'hooks/useDebounce';

const UserBox = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

enum TabTypes {
  TOTAL = 'total',
  POST = 'post',
  USER = 'user',
  TOPIC = 'topic',
}

const tabDatas = [
  {
    lable: '综合',
    tLable: '综合',
    type: TabTypes.TOTAL,
  },
  {
    lable: '最新',
    tLable: '最新',
    type: TabTypes.POST,
  },
  {
    lable: 'People',
    tLable: 'People',
    type: TabTypes.USER,
  },
  {
    lable: 'Topic',
    tLable: 'Topic',
    type: TabTypes.TOPIC,
  },
];

const Search = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const parsedQs = useParsedQueryString();
  const { replace } = useHistory();

  const {
    displayResultListOfPeoples,
    displayResultListOfTopic,
    resultListOfPost,
    dispalyLoading,
    postLoading,
    postIsEnd,
    searchVal,
    filterUser,
    searchPostMap,
  } = useStore(p => p.search);

  const [activeType, setActiveType] = useState(tabDatas[0].type);

  useEffect(() => {
    if (parsedQs.f) {
      setActiveType(parsedQs.f);
    }
  }, [parsedQs.f]);

  const userList = useMemo(() => {
    if (filterUser === 2)
      return displayResultListOfPeoples.filter(item => item.is_attention);
    return displayResultListOfPeoples;
  }, [filterUser, displayResultListOfPeoples]);

  // const search = useDebounce(searchVal, 300)

  useEffect(() => {
    if (getDecodeValue(parsedQs.q) !== searchVal || !resultListOfPost.length) {
      console.log(
        searchVal,
        getDecodeValue(parsedQs.q),
        resultListOfPost.length,
        'searchVal',
      );
      dispatch(fetchThunk.fetchSearchPostAsync(true));
      replace(
        getSearchPath({
          ...parsedQs,
          q: searchVal,
        }),
      );
    }
  }, [searchVal, replace, dispatch, parsedQs.q, resultListOfPost.length]);

  return (
    <Box>
      <Crumbs
        top
        // back
        zIndex={1005}
        hideBorder={false}
        callBack={() => {}}
        title={t('Search')}
      >
        <Flex alignItems='center' flex='1'>
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
          onChange={tab => {
            replace(
              getSearchPath({
                ...parsedQs,
                f: tab.type,
              }),
            );
            setActiveType(tab.type);
          }}
        />
        {dispalyLoading ? (
          <Spinner />
        ) : (
          <Box>
            <Box>
              {activeType === TabTypes.TOTAL && Boolean(userList.length) && (
                <UserBox>
                  <Text padding='15px 29px 10px 19px' bold>
                    {t('People')}
                  </Text>
                  {userList.slice(0, 3).map(item => {
                    return (
                      <HoverLink to={`${BASE_USER_PROFILE_URL}${item.uid}`}>
                        <UserFlowItem
                          padding='10px 29px 10px 19px'
                          uid={item.uid}
                          key={`u_${item.uid}`}
                          address={item.address}
                          is_attention={item.is_attention}
                          nft_image={item.nft_image}
                          introduction={item.introduction}
                          nick_name={item.nick_name}
                          onChanges={is_attention => {
                            dispatch(
                              storeAction.updatePeopleState({
                                uid: item.uid,
                                is_attention,
                              }),
                            );
                          }}
                        />
                      </HoverLink>
                    );
                  })}
                </UserBox>
              )}
              {activeType === TabTypes.TOTAL && resultListOfPost.length && (
                <PostResult
                  list={resultListOfPost}
                  map={searchPostMap}
                  loading={postLoading}
                  searchVal={searchVal}
                  isEnd={postIsEnd}
                />
              )}
              {activeType === TabTypes.TOTAL &&
                resultListOfPost.length === 0 &&
                userList.length === 0 && <Empty />}
            </Box>
            <Box>
              {activeType === TabTypes.POST && resultListOfPost.length && (
                <PostResult
                  list={resultListOfPost}
                  map={searchPostMap}
                  loading={postLoading}
                  searchVal={searchVal}
                  isEnd={postIsEnd}
                />
              )}
              {activeType === TabTypes.POST &&
                resultListOfPost.length === 0 && <Empty />}
            </Box>
            <Box>
              {activeType === TabTypes.USER &&
                userList.map(item => {
                  return (
                    <HoverLink to={`${BASE_USER_PROFILE_URL}${item.uid}`}>
                      <UserFlowItem
                        padding='10px 29px 10px 19px'
                        uid={item.uid}
                        key={`u_${item.uid}`}
                        address={item.address}
                        is_attention={item.is_attention}
                        nft_image={item.nft_image}
                        introduction={item.introduction}
                        nick_name={item.nick_name}
                        onChanges={is_attention => {
                          dispatch(
                            storeAction.updatePeopleState({
                              uid: item.uid,
                              is_attention,
                            }),
                          );
                        }}
                      />
                    </HoverLink>
                  );
                })}
              {activeType === TabTypes.USER && userList.length === 0 && (
                <Empty />
              )}
            </Box>
            <Box>
              {activeType === TabTypes.TOPIC &&
                displayResultListOfTopic.map(item => {
                  return (
                    <SearchTopicItem
                      key={`t_${item.topic_id}`}
                      id={item.topic_id}
                      post_num={item.post_num}
                      name={item.topic_name}
                    />
                  );
                })}
              {activeType === TabTypes.TOPIC &&
                displayResultListOfTopic.length === 0 && <Empty />}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Search;
