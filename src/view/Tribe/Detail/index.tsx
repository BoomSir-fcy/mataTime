import React, { useEffect } from 'react';
import { Crumbs, List } from 'components';
import styled from 'styled-components';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Box, Text, Button } from 'uikit';
import DetailHeader from './Header';
import DetailTitle from './Title';
import PostItem from './postItem';
import { useStore } from 'store';
import { useDispatch } from 'react-redux';
import { fetchTribeInfoAsync } from 'store/tribe';

const Detail: React.FC<RouteComponentProps> = React.memo(route => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    const search = route.location.search;
    const myQuery = search => {
      return new URLSearchParams(search);
    };
    const tribe_id = myQuery(search).get('id');
    if (tribe_id) {
      dispatch(fetchTribeInfoAsync({ tribe_id }));
    }
  }, [route]);

  return (
    <Box>
      <Crumbs back />
      <DetailHeader TribeInfo={TribeInfo} />
      <DetailTitle />
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
        {/* <Link to='/tribe/postdetail/1'>
        </Link> */}
        <PostItem />
      </List>
    </Box>
  );
});

export default Detail;
