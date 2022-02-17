import React, { useState } from 'react';
import { Flex, Text, Button, Box, FeaturedIcon } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled, { useTheme } from 'styled-components';
import {
  CommentPop,
  Icon,
  MoreOperatorEnum,
  MorePostPopup,
  PopupWrap,
} from 'components';
import SendUser from '../components/post/sendUser';
import HotBtn from '../components/post/HotBtn';
import Popup from 'reactjs-popup';
import { MoreTribePopup } from 'components/Popup/TribeMorePopup/morePopup';
import { SetTribePopup } from 'components/Popup/TribeSetPopup/SetPopup';
import MentionOperator from '../components/MentionOperator';

const PostBox = styled(Box)`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const Top = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;

const Featured = styled(FeaturedIcon)`
  width: 20px;
  height: 20px;
`;

const ContentText = styled(Text)`
  margin: 15px 0;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

interface PostInfoPorps {
  info: Api.Tribe.TribePost;
}

const PostItem: React.FC<PostInfoPorps> = ({ info }) => {
  const { t } = useTranslation();
  const popupRef = React.useRef();
  const theme = useTheme();
  return (
    <PostBox>
      <Top>
        <Flex width='80%' alignItems='center'>
          {info.selected !== 0 && <Featured />}
          {info.top !== 0 && (
            <Icon size={20} color='textOrigin' name='icon-jiantou' />
          )}
          <Text ml='10px' fontSize='18px' bold ellipsis>
            {info.title}
          </Text>
        </Flex>
        <Flex alignItems='center'>
          <a
            href='javascript: void(0)'
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
          >
            <Popup
              ref={popupRef}
              trigger={
                <PopupButton mr='30px' title={t('设置')}>
                  <Icon name='icon-shezhi' size={20} color='textTips' />
                </PopupButton>
              }
              nested
              position='bottom right'
              closeOnDocumentClick
              contentStyle={{
                width: '150px',
                height: 'auto',
                borderRadius: '10px',
                padding: 0,
                border: '0',
                backgroundColor: 'transparent',
                zIndex: 99,
              }}
              overlayStyle={{
                zIndex: 98,
              }}
              arrowStyle={{
                color: theme.colors.tertiary,
                stroke: theme.colors.tertiary,
              }}
            >
              <SetTribePopup
                postUid={'1'}
                data={{
                  ...info,
                  post: {
                    ...info,
                  },
                }}
                callback={(data: any, type) => {}}
              />
            </Popup>
          </a>
          <a
            href='javascript: void(0)'
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
          >
            <Popup
              ref={popupRef}
              trigger={
                <PopupButton title={t('popupMore')}>
                  <Icon name='icon-gengduo' size={20} color='textTips' />
                </PopupButton>
              }
              nested
              position='bottom right'
              closeOnDocumentClick
              contentStyle={{
                width: '150px',
                height: 'auto',
                borderRadius: '10px',
                padding: 0,
                border: '0',
                backgroundColor: 'transparent',
                zIndex: 99,
              }}
              overlayStyle={{
                zIndex: 98,
              }}
              arrowStyle={{
                color: theme.colors.tertiary,
                stroke: theme.colors.tertiary,
              }}
            >
              <MoreTribePopup
                postUid={'1'}
                data={{
                  ...info,
                  post: {
                    ...info,
                  },
                }}
                callback={(data: any, type) => {
                  // if (type === MoreOperatorEnum.BLOCKUSER) {
                  //   setIsShileUser(!isShileUser, itemData);
                  //   return;
                  // }
                  // popupRef?.current?.close();
                  // callback(data, type);
                }}
              />
            </Popup>
          </a>
        </Flex>
      </Top>
      <ContentText color='textTips'>
        这是一段部落的介绍The PhantaBear project was jointly launched by Jay
        Chou's PHANTACi and Ezek. PhantaBear is a collection of 10,000
        algorithmically generated digital collectibles that double as membership
        cards for the Ezek Club. Each
      </ContentText>
      <Flex justifyContent='space-between' alignItems='center'>
        <SendUser
          time={new Date(info.add_time).getTime()}
          name={info.user_name}
          Avatar={info.user_avator_url}
        />
        <Box width='50%'>
          <MentionOperator
            replyType='twitter'
            postId={1}
            hasReward={false}
            itemData={{
              ...info,
              post_id: info.id,
              post: {
                ...info,
                post_id: info.id,
              },
            }}
            callback={(item: any, type?: MoreOperatorEnum) => {
              // handleUpdateList(item, type);
            }}
          />
        </Box>
      </Flex>
      <HotBtn list={info.topics} />
    </PostBox>
  );
};

export default PostItem;
