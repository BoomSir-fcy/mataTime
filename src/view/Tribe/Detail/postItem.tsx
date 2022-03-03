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
  ContentParsing,
} from 'components';
import SendUser from '../components/post/sendUser';
import HotBtn from '../components/post/HotBtn';
import Popup from 'reactjs-popup';
import { MoreTribePopup } from 'components/Popup/TribeMorePopup/morePopup';
import { SetTribePopup } from 'components/Popup/TribeSetPopup/SetPopup';
import MentionOperator from '../components/MentionOperator';

const PostBox = styled(Box)`
  /* padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; */
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
  itemData: any;
  isTribeOnwer: boolean;
  callback?: (event: any, type?: any) => void;
  isShileUser?: boolean;
  setIsShileUser?: (type, data) => void;
}

const PostItem: React.FC<PostInfoPorps> = ({
  itemData,
  isTribeOnwer,
  isShileUser,
  callback,
  setIsShileUser,
}) => {
  const { t } = useTranslation();
  const popupRefSet = React.useRef(null);
  const popupRef = React.useRef(null);
  const theme = useTheme();
  return (
    <PostBox>
      <Top>
        <Flex width='80%' alignItems='center'>
          {itemData.selected !== 0 && <Featured />}
          {itemData.top !== 0 && (
            <Icon size={20} color='textOrigin' name='icon-jiantou' />
          )}
          <Text
            ml={itemData.selected !== 0 || itemData.top !== 0 ? '10px' : ''}
            fontSize='18px'
            bold
            ellipsis
          >
            {itemData.title}
          </Text>
        </Flex>
        <Flex alignItems='center'>
          {isTribeOnwer && (
            <a
              href='javascript: void(0)'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            >
              <SetTribePopup
                ref={popupRefSet}
                postUid={'1'}
                data={{
                  ...itemData,
                  post: {
                    ...itemData,
                  },
                }}
                callback={(data: any, type) => {}}
              />
            </a>
          )}
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
                  ...itemData,
                  post: {
                    ...itemData,
                  },
                }}
                callback={(data: any, type) => {
                  if (type === MoreOperatorEnum.BLOCKUSER) {
                    setIsShileUser(!isShileUser, itemData);
                    return;
                  }
                  popupRef?.current?.close();
                  callback(data, type);
                }}
              />
            </Popup>
          </a>
        </Flex>
      </Top>
      <Box padding='15px 0'>
        <ContentParsing mode='preview' content={itemData.content} />
      </Box>
      {/* <Flex justifyContent='space-between' alignItems='center'>
        <SendUser
          time={new Date(itemData.add_time).getTime()}
          name={itemData.user_name}
          Avatar={itemData.user_avator_url}
        />
        <Box width='50%'>
          <MentionOperator
            replyType='twitter'
            postId={1}
            hasReward={false}
            itemData={{
              ...itemData,
              post_id: itemData.id,
              post: {
                ...itemData,
                post_id: itemData.id,
              },
            }}
            callback={(item: any, type?: MoreOperatorEnum) => {
              // handleUpdateList(item, type);
            }}
          />
        </Box>
      </Flex>
      <HotBtn list={itemData.topics} /> */}
    </PostBox>
  );
};

export default PostItem;
