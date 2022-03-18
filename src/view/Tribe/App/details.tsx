import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Box } from 'uikit';
import { Crumbs, JoinTribeModal, JoinInviteModal } from 'components';
import { useTranslation } from 'contexts';
import { storeAction, useStore } from 'store';
import { fetchisApprove } from 'store/tribe';
import { useTribeInfoById, useFetchTribeInfoById } from 'store/mapModule/hooks';
import { useAccountStakeApprove } from 'store/tribe/hooks';

import useParsedQueryString from 'hooks/useParsedQueryString';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import DetailHeader from './components/tribeInfoDetail';
import TribeInformation from './components/tribeInformation';
import TribeNft from '../components/Sidebar/tribeNft';

import TribeTags from '../components/Sidebar/tribeTags';
import TribeFiles from '../components/Sidebar/tribeFiles';

const Info = styled(Box)`
  padding: 25px 15px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const AppTribeDetails = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const parsedQs = useParsedQueryString();
  const tribInfo = useTribeInfoById(parsedQs.id);
  const { updater } = useFetchTribeInfoById(parsedQs.id);
  const { joinTribe } = useStore(p => p.tribe);
  const [visible, setVisible] = useState(false);

  const { baseInfo } = tribInfo || {};

  useEffect(() => {
    if (account && baseInfo?.feeToken) {
      dispatch(
        fetchisApprove({
          account,
          address: baseInfo?.feeToken,
        }),
      );
    }
  }, [account, baseInfo]);

  useEffect(() => {
    return () => {
      dispatch(storeAction.setJoinTribeVisibleModal(false));
    };
  }, []);

  useAccountStakeApprove();

  return (
    <>
      <Box>
        <Crumbs back />
        <DetailHeader
          tribeInfo={tribInfo}
          openInvite={() => setVisible(true)}
        />
        <Info>
          <TribeNft tribe_id={parsedQs.id} mb='15px' />
          <TribeInformation tribe_id={parsedQs.id} mb='15px' />
          <TribeTags tribe_id={parsedQs.id} mb='15px' />
          <TribeFiles tribe_id={parsedQs.id} mb='15px' />
        </Info>
      </Box>

      {/* 邀请框 */}
      <JoinInviteModal
        tribe_id={tribInfo?.tribe_id}
        visible={visible}
        onClose={() => setVisible(false)}
      />

      {/* 加入部落 */}
      {joinTribe.joinVisible && (
        <JoinTribeModal
          visible={joinTribe.joinVisible}
          tribeInfo={tribInfo}
          tribeBaseInfo={baseInfo}
          onClose={event => {
            dispatch(storeAction.setJoinTribeVisibleModal(false));
            if (event) {
              updater();
            }
          }}
        />
      )}
    </>
  );
};

export default AppTribeDetails;
