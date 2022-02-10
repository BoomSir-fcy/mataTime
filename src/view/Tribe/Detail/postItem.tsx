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

const PostItem = () => {
  const { t } = useTranslation();
  const popupRef = React.useRef();
  const theme = useTheme();
  const data = {
    add_time: '2022-01-28T01:25:04Z',
    add_time_desc: '2022-01-28T01:25:04Z',
    comment_num: 0,
    content:
      '[{"type":"paragraph","children":[{"text":"#Welcome 话题带中文 #广东富豪梵蒂冈 中文话题 "},{"type":"mention","character":"@上海幸运 黑8","attrs":{"userid":182278046},"children":null},{"text":"昵称带中文"}]}]',
    id: 694,
    image_list: [],
    is_attention: 1,
    is_comment: 0,
    is_fav: 0,
    is_like: 0,
    is_share: 0,
    is_top: 0,
    like_num: 0,
    post: {
      tid: 1,
      id: 694,
      content:
        '[{"type":"paragraph","children":[{"text":"#Welcome…":182278046},"children":null},{"text":"昵称带中文"}]}]',
      user_name: 'chill for life gun for fight2',
      user_id: 179637355,
    },
    post_id: 694,
    reward_stats: null,
    share_num: 0,
    tid: 1,
    total_receive_time: '224',
    user_address: '0xbf454362ffd10007e337f57703eac30185b31b48',
    user_avator_url: 'https://api.dsgmetaverse.com/gphoto/gen/C6919461.png',
    user_id: 179637355,
    user_name: 'chill for life gun for fight2',
    video_url: '',
  };
  return (
    <PostBox>
      <Top>
        <Flex alignItems='center'>
          <Featured />
          {/* <Icon size={20} color='textOrigin' name='icon-jiantou' /> */}
          <Text ml='10px' fontSize='18px' bold ellipsis>
            这是最新置顶的帖子 一共可以置顶3篇
          </Text>
        </Flex>
        <Flex alignItems='center'>
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
              data={data}
              callback={(data: any, type) => {}}
            />
          </Popup>
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
              data={data}
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
          time={new Date().getTime()}
          name='sad的分公司的'
          Avatar='https://api.dsgmetaverse.com/gphoto/mngen/4411022.png'
        />
        <Box width='50%'>
          <MentionOperator
            replyType='twitter'
            postId={1}
            hasReward={false}
            itemData={{
              ...data,
              post_id: data.id,
              post: {
                ...data,
                post_id: data.id,
              },
            }}
            callback={(item: any, type?: MoreOperatorEnum) => {
              // handleUpdateList(item, type);
            }}
          />
        </Box>
      </Flex>
      <HotBtn list={['Web3.0', '555555555']} />
    </PostBox>
  );
};

export default PostItem;
