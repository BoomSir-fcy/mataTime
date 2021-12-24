import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { Flex, Box, Image } from 'uikit';

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

export const RewardAuthTag: React.FC<RewardAuthProps> = ({
  data,
  postType,
}) => {
  const reward: reward[] = data.reward_stats || [];
  const popupRef = React.useRef(null);
  const total = reward.reduce((total, currentValue) => {
    return total + currentValue.count;
  }, 0);

  const close = () => {
    if (popupRef.current) {
      popupRef?.current?.close();
    }
  };

  return (
    <React.Fragment>
      {postType === 1 ? (
        <></>
      ) : (
        <RewardAuthTagStyled alignItems='center'>
          <Popup
            ref={popupRef}
            trigger={
              <PopupButton>
                <Box width='18px' mr='10px'>
                  <Image
                    src={require('assets/images/reward.svg').default}
                    width={18}
                    height={18}
                  />
                </Box>
                {total || 0}
              </PopupButton>
            }
            nested
            keepTooltipInside={true}
            position='top right'
            closeOnDocumentClick
            contentStyle={{
              width: '400px',
              height: 'auto',
              minHeight: '80px',
              borderRadius: '10px',
              padding: 0,
              border: '0',
              backgroundColor: 'transparent',
              zIndex: 99,
            }}
            overlayStyle={{
              zIndex: 98,
            }}
            arrowStyle={{ opacity: 0 }}
          >
            <RewardAuthModal
              postType={postType}
              currentPost={data}
              avatar={data.user_avator_url}
              onClose={close}
            />
          </Popup>
        </RewardAuthTagStyled>
      )}
    </React.Fragment>
  );
};

export default RewardAuthTag;
