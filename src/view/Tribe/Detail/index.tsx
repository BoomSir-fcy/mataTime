import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Crumbs, Icon, JoinTribeModal } from 'components';
import { Flex, Box, Button } from 'uikit';
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
import { ExpireModal } from 'components/ModalWrapper/Tribe/ExpireModal';
import { ShieldedModal } from 'components/ModalWrapper/Tribe/ShieldedModal';

const TribeBox = styled(Box)`
  width: 100%;
  max-width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 670px;
    flex: 1;
    margin-right: 14px;
    border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  }
`;

const TribeInfo = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

const Sidebar = styled(Box)`
  opacity: 0;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    opacity: 1;
    display: block;
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
    // if (TribeId) {
    //   updater();
    // }
    return () => {
      dispatch(storeAction.setJoinTribeVisibleModal(false));
    };
  }, [TribeId]);

  return (
    <Flex width='100%'>
      <ExpireModal tribeInfo={tribeDetailInfo} tribeBaseInfo={baseInfo} />
      <ShieldedModal tribeInfo={tribeDetailInfo} />
      <TribeBox>
        <Crumbs back>
          <Flex>
            <Link
              className='hide-media-md'
              to={`/tribe/app/detail?id=${parsedQs.id}`}
            >
              <Button variant='text' style={{ fontWeight: 400 }}>
                <Icon
                  name='icon-bulaguanli'
                  size={20}
                  color='white_black'
                ></Icon>
              </Button>
            </Link>
            <Link className='hide-media-md' to='/search'>
              <Button variant='text'>
                <Icon name='icon-sousuo' size={20} color='white_black'></Icon>
              </Button>
            </Link>
            {/* TODO: 聊天室 */}
            {/* <Link
              className='hide-media-md'
              to={`/tribe/app/chatRoom?id=${parsedQs.id}`}
            >
              <Button variant='text'>
                <Icon name='icon-tixing' size={20} color='white_black'></Icon>
              </Button>
            </Link> */}
          </Flex>
        </Crumbs>
        <TribeInfo>
          <DetailHeader TopicId={TopicId} TribeInfo={tribeDetailInfo} />
          {!TopicId && (
            <DetailSearch TribeId={TribeId} tabsChange={tabsChange} />
          )}
        </TribeInfo>

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

      {!isApp() && (
        <Sidebar>
          <TribeSidebar tribe_info={tribeDetailInfo} tribe_id={TribeId} />
        </Sidebar>
      )}

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
