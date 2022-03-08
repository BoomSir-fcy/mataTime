import React, { useState } from 'react';
import { Flex, Text, Button, Box, FeaturedIcon } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled, { useTheme } from 'styled-components';
import { Icon, MoreOperatorEnum, ContentParsing } from 'components';
import Popup from 'reactjs-popup';
import { MoreTribePopup } from 'components/Popup/TribeMorePopup/morePopup';
import { SetTribePopup } from 'components/Popup/TribeSetPopup/SetPopup';
import { usePostTranslateMap } from 'store/mapModule/hooks';
import PostHandleBtns from './PostHandleBtns';
import { FetchStatus } from 'config/types';
import ContentParsingOfTranslate from './ContentParsingOfTranslate';

const PostBox = styled(Box)``;

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

  const translateData = usePostTranslateMap(itemData.id);

  return (
    <PostBox>
      <Top>
        <Flex width='80%' alignItems='center'>
          {itemData.selected !== 0 && <Featured />}
          {itemData.tribe_top !== 0 && (
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
        <PostHandleBtns
          itemData={itemData}
          isTribeOnwer={isTribeOnwer}
          callback={callback}
          isShileUser={isShileUser}
          showTranslateIcon={
            translateData && translateData?.status !== FetchStatus.NOT_FETCHED
          }
          showTranslate={translateData?.showTranslate}
          setIsShileUser={setIsShileUser}
        />
      </Top>
      <Box padding='15px 0'>
        <ContentParsingOfTranslate
          itemData={itemData}
          mode='preview'
          callback={callback}
          translateData={translateData}
        />
        {/* <ContentParsing mode='preview' content={itemData.content} /> */}
      </Box>
    </PostBox>
  );
};

export default PostItem;
