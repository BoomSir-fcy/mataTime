import React, { useEffect, useState } from 'react';
import { Crumbs, HoverLink, List } from 'components';
import styled from 'styled-components';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Box, Text, Button, Empty } from 'uikit';
import DetailHeader from './Header';
import DetailTitle from './Title';
import PostItem from './postItem';
import { useStore } from 'store';
import { useDispatch } from 'react-redux';
import { fetchTribeInfoAsync, fetchTribePostAsync } from 'store/tribe';

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
  const PostList = useStore(p => p.tribe.postList.list);

  useEffect(() => {
    const search = route.location.search;
    const myQuery = search => {
      return new URLSearchParams(search);
    };
    const tribe_id = myQuery(search).get('id');
    if (tribe_id) {
      setTribeId(Number(tribe_id));
    }
  }, [route]);

  useEffect(() => {
    if (TribeId) {
      dispatch(fetchTribeInfoAsync({ tribe_id: TribeId }));
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
    <Box>
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
              <HoverLink key={item.id} to={`/tribe/postdetail/${item.id}`}>
                <PostItem info={item} />
              </HoverLink>
            ))}
          </>
        ) : (
          <Empty />
        )}
      </List>
    </Box>
  );
});

export default Detail;
