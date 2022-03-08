import React, { useState } from 'react';
import { Flex, Text, Button, Box, FeaturedIcon, TranslateIcon } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled, { useTheme } from 'styled-components';
import { Icon, MoreOperatorEnum, ContentParsing } from 'components';
import Popup from 'reactjs-popup';
import { MoreTribePopup } from 'components/Popup/TribeMorePopup/morePopup';
import { SetTribePopup } from 'components/Popup/TribeSetPopup/SetPopup';
import { changePostTranslateState } from 'store/mapModule/reducer';
import { useDispatch } from 'react-redux';

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

interface PostHandleBtnsProps {
  itemData: any;
  isTribeOnwer: boolean;
  callback?: (event: any, type?: any) => void;
  isShileUser?: boolean;
  showTranslate?: boolean;
  showTranslateIcon?: boolean;
  setIsShileUser?: (type, data) => void;
}

const PostHandleBtns: React.FC<PostHandleBtnsProps> = ({
  itemData,
  isTribeOnwer,
  isShileUser,
  showTranslate,
  showTranslateIcon,
  callback,
  setIsShileUser,
}) => {
  const { t } = useTranslation();
  const popupRefSet = React.useRef(null);
  const popupRef = React.useRef(null);
  const theme = useTheme();

  const dispatch = useDispatch();

  return (
    <Flex alignItems='center'>
      {showTranslateIcon && (
        <Button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            callback(
              {
                ...itemData,
              },
              MoreOperatorEnum.TRANSLATE,
            );
            dispatch(
              changePostTranslateState({
                id: itemData.id,
                showTranslate: !showTranslate,
              }),
            );
          }}
          variant='text'
          className={showTranslate ? '' : 'icon-shield'}
          mr='18px'
          padding='0'
          title={t('Translate')}
        >
          <TranslateIcon />
        </Button>
      )}
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
            data={{
              ...itemData,
              post: {
                ...itemData,
              },
            }}
            callback={(data: any, type) => {
              popupRefSet?.current?.close();
              callback(data, type);
            }}
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
  );
};

export default PostHandleBtns;
