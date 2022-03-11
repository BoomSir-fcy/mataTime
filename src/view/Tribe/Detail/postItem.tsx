import React, { useState } from 'react';
import { Flex, Text, Button, Box, FeaturedIcon } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import { Icon } from 'components';
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
  const translateData = usePostTranslateMap(itemData.id);

  return (
    <PostBox>
      <Top>
        <Flex width='80%' alignItems='center'>
          {!!itemData.selected && <Featured />}
          {!!itemData.tribe_top && (
            <Icon size={20} color='textOrigin' name='icon-jiantou' />
          )}
          <Text
            ml={itemData.selected || itemData.top ? '10px' : ''}
            fontSize='18px'
            bold
            ellipsis
          >
            {itemData.title ?? itemData?.tribe_data?.title}
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
