import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  withRouter,
  useHistory,
  useLocation,
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToast } from 'hooks';
import { Editor, Crumbs, Icon, SendPost, VerifyCode } from 'components';
import { Flex, Box, Button } from 'uikit';
import { isApp } from 'utils/client';
import { storeAction, useStore } from 'store';
import { Api } from 'apis';

import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTranslation } from 'contexts/Localization';
import DetailTitle from './Title';
import { TribeSidebar } from '../components/Sidebar';
import DetailHeader from './Header';
import { TribePostList } from './post';
import {
  fetchTribeInfoAsync,
  fetchTribePostAsync,
  fetchTribeDetailAsync,
  fetchGetTribeBaseInfo,
  fetchisApprove,
} from 'store/tribe';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

// import { Tabs, ArticleList } from './center';

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
  const { account } = useActiveWeb3React();
  const parsedQs = useParsedQueryString();
  const dispatch = useDispatch();
  const TribeInfo = useStore(p => p.tribe.tribeInfo);
  const TribePost = useStore(p => p.tribe.postList);
  const tribeBaseInfo = useStore(p => p.tribe.tribeBaseInfo);
  const PostList = useStore(p => p.tribe.postList.list);

  const attention = useStore(p => p.post.attention);
  const [refresh, setRefresh] = useState(false);
  const [filterVal, setFilterVal] = useState({
    attention: parsedQs.attention || attention || 2,
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
    }
    return () => {};
  }, [TribeId]);
  return (
    <Flex>
      <TribeBox>
        <Crumbs back />
        <DetailHeader TribeInfo={TribeInfo} />
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
        <TribeSidebar />
      </Sidebar>
    </Flex>
  );
});

export default withRouter(Detail);
