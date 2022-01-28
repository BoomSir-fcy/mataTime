import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flex, Box, Image, useTooltip } from 'uikit';
import { useStore, storeAction } from 'store';
import { isApp } from 'utils/client';

import { Api } from 'apis';

import RewardAuthModal from './RewardAuthModal';
import useMenuNav from 'hooks/useMenuNav';
import { GetPostRewardAuthor } from './hook';

import { useTranslation } from 'contexts/Localization';

import 'reactjs-popup/dist/index.css';

const StyledPopup = styled(Popup)<{ isMobile: boolean }>`
  position: relative;
  &-overlay {
    z-index: 98 !important;
  }
  &-content {
    width: ${({ isMobile }) =>
      isMobile ? 'calc(100% - 8px)!important' : 'atuo'};
    left: ${({ isMobile }) => (isMobile ? '4px !important' : 'atuo')};
  }
`;

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
  const dispatch = useDispatch();
  const location = useLocation();
  const reward: reward[] = data.reward_stats || [];
  const postList = useStore(p => p.post.list);
  const { t } = useTranslation();
  const { isMobile } = useMenuNav();
  const { isReward } = GetPostRewardAuthor();
  const [visible, setVisible] = React.useState(false);
  const popupRef = React.useRef(null);

  const total = reward.reduce((total, currentValue) => {
    return total + currentValue.count;
  }, 0);

  let timer: any = 0;

  React.useEffect(() => {
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  const { targetRef, tooltip, tooltipVisible, close } = useTooltip(
    <RewardAuthModal
      postType={postType}
      currentPost={{ ...data, reward_id: data?.post_id ?? data.id }}
      avatar={data.user_avator_url}
      onClose={async event => {
        close(event);
        timer = setInterval(async () => {
          try {
            const ids = String(data?.post_id ?? data.id);
            const res = await isReward(ids);
            if (Api.isSuccess(res)) {
              const rewardArr = res.data.reward_stats || [];
              const RewardTotal = rewardArr.reduce((total, currentValue) => {
                return total + currentValue.count;
              }, 0);
              if (total < RewardTotal) {
                timer && clearInterval(timer);
                const updatePost = postList.map((row: any) => {
                  if (row.id === Number(ids)) {
                    return { ...row, reward_stats: res.data.reward_stats };
                  }
                  return row;
                });
                dispatch(storeAction.postUpdateArticle([...updatePost]));
              }
            }
          } catch (error) {
            console.error(error);
          }
        }, 2000);
      }}
    />,
    {
      placement:
        isApp() && location.pathname.indexOf('articleDetils') > -1
          ? 'auto-end'
          : 'top-end',
      trigger: 'click',
      stylePadding: '0',
      hideArrow: true,
      invert: false,
      tooltipPadding: 0,
      tooltipOffset: [0, 5],
      background: 'transparent',
    },
    'root',
  );

  return (
    <React.Fragment>
      {postType === 1 ? (
        <></>
      ) : (
        <React.Fragment>
          <PopupButton ref={targetRef} title={t('editorReward')}>
            <Box width='18px' mr='10px'>
              <Image
                src={require('assets/images/reward.svg').default}
                width={18}
                height={18}
              />
            </Box>
            {total || 0}
          </PopupButton>
          {tooltipVisible && tooltip}
        </React.Fragment>
        // <RewardAuthTagStyled alignItems='center'>
        //   <StyledPopup
        //     isMobile={isMobile}
        //     ref={popupRef}
        //     trigger={
        //       <PopupButton>
        //         <Box width='18px' mr='10px'>
        //           <Image
        //             src={require('assets/images/reward.svg').default}
        //             width={18}
        //             height={18}
        //           />
        //         </Box>
        //         {total || 0}
        //       </PopupButton>
        //     }
        //     nested
        //     keepTooltipInside={true}
        //     position='top right'
        //     closeOnDocumentClick
        //     contentStyle={{
        //       width: '400px',
        //       height: 'auto',
        //       minHeight: '80px',
        //       borderRadius: '10px',
        //       padding: 0,
        //       border: '0',
        //       backgroundColor: 'transparent',
        //       zIndex: 99,
        //     }}
        //     overlayStyle={{
        //       zIndex: 98,
        //     }}
        //     arrowStyle={{ opacity: 0 }}
        //   >
        //     <RewardAuthModal
        //       postType={postType}
        //       currentPost={data}
        //       avatar={data.user_avator_url}
        //       onClose={close}
        //     />
        //   </StyledPopup>
        // </RewardAuthTagStyled>
      )}
    </React.Fragment>
  );
};

export default RewardAuthTag;
