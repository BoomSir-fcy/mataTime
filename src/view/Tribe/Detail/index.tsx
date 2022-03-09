import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Crumbs, JoinTribeModal } from 'components';
import { Flex, Box } from 'uikit';
import { isApp } from 'utils/client';
import { storeAction, useStore } from 'store';

import { useAccountStakeApprove } from 'store/tribe/hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import { TribePostList } from './post';
import DetailTitle from './Title';
import DetailHeader from './Header';
import DetailSearch from './search';
import { TribeSidebar } from '../components/Sidebar';

import { fetchTribeInfoAsync, fetchisApprove } from 'store/tribe';
import { useTribeInfoById, useFetchTribeInfoById } from 'store/mapModule/hooks';

const TribeBox = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1;
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

const Detail: React.FC = React.memo(() => {
  const parsedQs = useParsedQueryString();
  const dispatch = useDispatch();
  const tribeDetailInfo = useTribeInfoById(parsedQs.id);
  const { account } = useActiveWeb3React();
  const { joinTribe } = useStore(p => p.tribe);
  const { baseInfo } = tribeDetailInfo || {};
  const { updater } = useFetchTribeInfoById(parsedQs.id);

  const [refresh, setRefresh] = useState(false);
  const [filterVal, setFilterVal] = useState({
    ActiveTitle: parsedQs.active || 0,
  });
  const [TribeId, setTribeId] = useState(Number(parsedQs.id));
  const [TopicId, setTopicId] = useState(Number(parsedQs.topic) || null);

  const articleRefs = React.useRef(null);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);

  useAccountStakeApprove();

  const tabsChange = obj => {
    setFilterVal(obj);
    setRefresh(!refresh);
  };

  useEffect(() => {
    setTopicId(Number(parsedQs.topic) || null);
  }, [parsedQs?.topic]);

  useEffect(() => {
    if (account && baseInfo?.feeToken) {
      dispatch(
        fetchisApprove({
          account,
          address: baseInfo?.feeToken,
        }),
      );
    }
  }, [account, baseInfo?.feeToken]);

  useEffect(() => {
    if (TribeId) {
      dispatch(fetchTribeInfoAsync({ tribe_id: TribeId }));
    }
    return () => {
      dispatch(storeAction.setJoinTribeVisibleModal(false));
    };
  }, [TribeId]);

  return (
    <Flex>
      <TribeBox>
        <Crumbs back />
        <DetailHeader TopicId={TopicId} TribeInfo={tribeDetailInfo} />
        {!TopicId && <DetailSearch TribeId={TribeId} tabsChange={tabsChange} />}
        <DetailTitle
          TribeId={TribeId}
          tabsChange={tabsChange}
          TopicId={TopicId}
        />
        <TribePostList
          TopicId={TopicId}
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

      {/* 加入部落 */}
      {joinTribe.joinVisible && (
        <JoinTribeModal
          visible={joinTribe.joinVisible}
          tribeInfo={tribeDetailInfo}
          tribeBaseInfo={baseInfo}
          onClose={event => {
            dispatch(storeAction.setJoinTribeVisibleModal(false));
            if (event) {
              updater();
            }
          }}
        />
      )}
    </Flex>
  );
});

export default withRouter(Detail);
