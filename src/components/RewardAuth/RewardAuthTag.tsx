import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { Flex, Box } from 'uikit';
import { Icon } from '../Icon';

import RewardAuthModal from './RewardAuthModal';

import 'reactjs-popup/dist/index.css';
// import useRewardAuth from 'contexts/RewardAuthContext/hooks/useRewardAuth';

const RewardAuthTagStyled = styled(Flex)`
  position: relative;
`;
const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
  i {
    background: -webkit-linear-gradient(180deg, #ffd700, #e29d24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent !important;
  }
`;

export const RewardAuthTag: React.FC<RewardAuthProps> = ({ data }) => {
  const reward: reward[] = data.reward_stats || [];
  const popupRef = React.useRef(null);

  const close = () => {
    if (popupRef.current) {
      popupRef?.current?.close();
    }
  };

  return (
    <RewardAuthTagStyled alignItems="center">
      <Popup
        ref={popupRef}
        trigger={
          <PopupButton>
            <Icon color="red" margin="0 10px 0 0" name="icon-dashang" />
            {reward?.length || 0}
          </PopupButton>
        }
        nested
        keepTooltipInside={true}
        position="top right"
        closeOnDocumentClick
        contentStyle={{
          width: '418px',
          height: 'auto',
          minHeight: '80px',
          borderRadius: '10px',
          padding: 0,
          border: '0',
          backgroundColor: 'transparent'
        }}
        arrowStyle={{ opacity: 0 }}
      >
        <RewardAuthModal
          currentPost={data}
          avatar={data.user_avator_url}
          onClose={close}
        />
      </Popup>
      {/* {visible && (
        <RewardAuthModal currentPost={data} avatar={data.user_avator_url} />
      )} */}
    </RewardAuthTagStyled>
  );
};

export default RewardAuthTag;
