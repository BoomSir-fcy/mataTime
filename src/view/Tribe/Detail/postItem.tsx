import React, { useState } from 'react';
import { Flex, Text, Button, Box, FeaturedIcon } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled, { useTheme } from 'styled-components';
import { CommentPop, Icon, PopupWrap } from 'components';
import SendUser from '../components/post/sendUser';
import HotBtn from '../components/post/HotBtn';

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
  const popupRefs = React.useRef();
  const theme = useTheme();

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
          <PopupWrap
            ref={popupRefs}
            trigger={
              <PopupButton>
                <Icon name='icon-gengduo' current={1} color='#7E7E7E' />
              </PopupButton>
            }
            arrowStyle={{
              color: theme.colors.tertiary,
              stroke: theme.colors.tertiary,
            }}
          >
            <CommentPop postUserId={1} data={1} callback={() => {}} />
          </PopupWrap>
        </Flex>
      </Top>
      <ContentText>
        这是一段部落的介绍The PhantaBear project was jointly launched by Jay
        Chou's PHANTACi and Ezek. PhantaBear is a collection of 10,000
        algorithmically generated digital collectibles that double as membership
        cards for the Ezek Club. Each
      </ContentText>
      <Flex>
        <SendUser
          time={new Date().getTime()}
          name='sad的分公司的'
          Avatar='https://api.dsgmetaverse.com/gphoto/mngen/4411022.png'
        />
      </Flex>
      <HotBtn list={['Web3.0', '555555555']} />
    </PostBox>
  );
};

export default PostItem;
