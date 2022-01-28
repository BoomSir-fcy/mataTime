import { Crumbs, List } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Text, Button } from 'uikit';
import DetailHeader from './Header';
import DetailTitle from './Title';
import PostItem from './postItem';
import { useStore } from 'store';

const Detail = () => {
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

  return (
    <Box>
      <Crumbs back />
      <DetailHeader />
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
};

export default Detail;
