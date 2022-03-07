import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Crumbs } from 'components';
import { Flex, Box } from 'uikit';
import { isApp } from 'utils/client';
import { useStore } from 'store';

import useParsedQueryString from 'hooks/useParsedQueryString';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import { TribePostList } from './post';
import DetailTitle from './Title';
import DetailHeader from './Header';
import PostItem from './postItem';
import { TribeSidebar } from '../components/Sidebar';

import { fetchTribeInfoAsync, fetchisApprove } from 'store/tribe';
import { useTribeInfoById, useFetchTribeInfoById } from 'store/mapModule/hooks';

const TribeBox = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 14px;
    border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  }
`;

const Sidebar = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 300px;
  }
`;

const Detail: React.FC<RouteComponentProps> = React.memo(route => {
  const parsedQs = useParsedQueryString();
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const { tribeInfo, tribeBaseInfo } = useStore(p => p.tribe);
  const PostList = useStore(p => p.tribe.postList.list);
  const tribeDetailInfo = useTribeInfoById(parsedQs.id);
  const { updater } = useFetchTribeInfoById(parsedQs.id);

  const [refresh, setRefresh] = useState(false);
  const [filterVal, setFilterVal] = useState({
    ActiveTitle: parsedQs.active || 0,
  });
  const [TribeId, setTribeId] = useState(0);

  const articleRefs = React.useRef(null);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);

  const tabsChange = obj => {
    setFilterVal(obj);
    setRefresh(!refresh);
  };

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
    if (account && tribeBaseInfo?.feeToken) {
      dispatch(
        fetchisApprove({
          account,
          address: tribeBaseInfo?.feeToken,
        }),
      );
    }
  }, [account, tribeBaseInfo?.feeToken]);
  useEffect(() => {
    if (TribeId) {
      dispatch(fetchTribeInfoAsync({ tribe_id: TribeId }));
    }
    return () => {};
  }, [TribeId]);

  return (
    <Flex>
      <TribeBox>
        <Crumbs back />
        <DetailHeader TribeInfo={tribeInfo} />
        <DetailTitle TribeId={TribeId} tabsChange={tabsChange} />
        <TribePostList
          TribeId={TribeId}
          ref={articleRefs}
          setNonce={setNonce}
          nonce={nonce}
          filterValObj={filterVal}
        />
      </TribeBox>

      <Sidebar>
        <TribeSidebar tribe_info={tribeDetailInfo} tribe_id={TribeId} />
      </Sidebar>
    </Flex>
  );
});

export default withRouter(Detail);
