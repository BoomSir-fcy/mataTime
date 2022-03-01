import React, { useEffect, useState } from 'react';
import { Crumbs, HoverLink, List } from 'components';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Flex, Box, Text, Button, Empty } from 'uikit';
import DetailHeader from './Header';
import DetailTitle from './Title';
import PostItem from './postItem';
import { useStore } from 'store';
import {
  fetchTribeInfoAsync,
  fetchTribePostAsync,
  fetchTribeDetailAsync,
  fetchGetTribeBaseInfo,
  fetchisApprove,
} from 'store/tribe';

import { getBnbAddress } from 'utils/addressHelpers';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import { TribeSidebar } from '../components/Sidebar';

const TribeBox = styled(Box)`
  width: 100%;
  margin-right: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  }
`;

const Sidebar = styled(Box)`
  min-width: 300px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 300px;
  }
`;

const Detail: React.FC<RouteComponentProps> = React.memo(route => {
  const dispatch = useDispatch();
  const [TribeId, setTribeId] = useState(0);
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(10);
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
    historyList,
  } = useStore(p => p.search);
  const TribeInfo = useStore(p => p.tribe.tribeInfo);
  const TribePost = useStore(p => p.tribe.postList);
  const tribeBaseInfo = useStore(p => p.tribe.tribeBaseInfo);
  const PostList = useStore(p => p.tribe.postList.list);
  const { account } = useActiveWeb3React();

  useEffect(() => {
    const { search } = route.location;
    const myQuery = search => {
      return new URLSearchParams(search);
    };
    const tribe_id = myQuery(search).get('id');
    if (tribe_id) {
      setTribeId(Number(tribe_id));
    }
  }, [route]);

  useEffect(() => {
    console.log(tribeBaseInfo.feeToken, getBnbAddress());
    if (account && tribeBaseInfo.feeToken) {
      dispatch(
        fetchisApprove({
          account,
          address: tribeBaseInfo.feeToken,
        }),
      );
    }
  }, [account, tribeBaseInfo.feeToken]);

  useEffect(() => {
    if (TribeId) {
      dispatch(fetchTribeInfoAsync({ tribe_id: TribeId }));
      dispatch(fetchGetTribeBaseInfo({ tribeId: TribeId }));
      dispatch(fetchTribeDetailAsync({ tribe_id: TribeId }));
      // dispatch(
      //   fetchTribePostAsync({
      //     selected: TribePost.selected,
      //     page: page,
      //     per_page: page_size,
      //     top: TribePost.top,
      //     tribe_id: TribeId,
      //     newest_sort: 1,
      //   }),
      // );
    }
    return () => {};
  }, [TribeId]);

  return (
    <Flex>
      <TribeBox>
        <Crumbs back />
        <DetailHeader TribeInfo={TribeInfo} />
        <DetailTitle TribeId={TribeId} page_size={page_size} />
        <List
          loading={postLoading}
          renderList={type => {
            if (
              (type === 1 && resultListOfPost?.length !== 0) ||
              postLoading ||
              postIsEnd
            ) {
              return;
            }
            // getList(type);
          }}
        >
          {PostList.length ? (
            <>
              {PostList.map((item, index) => (
                <HoverLink key={item.id} to={`/tribe/postdetail?i=${item.id}`}>
                  <PostItem info={item} />
                </HoverLink>
              ))}
            </>
          ) : (
            <Empty />
          )}
        </List>
      </TribeBox>
      <Sidebar>
        <TribeSidebar />
      </Sidebar>
    </Flex>
  );
});

export default Detail;
