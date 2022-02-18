import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Crumbs, List } from 'components';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Flex, Box, Text, Button } from 'uikit';
import DetailHeader from './Header';
import DetailTitle from './Title';
import PostItem from './postItem';
import { useStore } from 'store';
import { fetchTribeInfoAsync } from 'store/tribe';

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
    const { search } = route.location;
    const myQuery = search => {
      return new URLSearchParams(search);
    };
    const tribe_id = myQuery(search).get('id');
    if (tribe_id) {
      dispatch(fetchTribeInfoAsync({ tribe_id }));
    }
  }, [route]);

  return (
    <Flex>
      <TribeBox>
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
      </TribeBox>
      <Sidebar>
        <TribeSidebar />
      </Sidebar>
    </Flex>
  );
});

export default Detail;
