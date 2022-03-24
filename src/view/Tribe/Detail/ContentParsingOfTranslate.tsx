import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MoreOperatorEnum, ImgList, ContentParsing } from 'components';
import { Button, Flex, Text, TranslateIcon, Box, LinkExternal } from 'uikit';
import { useTranslation } from 'contexts/Localization';

import { ARTICLE_POST_FORWARD_ROW, ARTICLE_POST_MAX_ROW } from 'config';

import { usePostTranslateMap } from 'store/mapModule/hooks';
import { FetchStatus } from 'config/types';
import { useDispatch } from 'react-redux';
import {
  changePostTranslateState,
  fetchPostTranslateAsync,
} from 'store/mapModule/reducer';
import { TranslateInfo } from 'store/types';

import { PreviewImg } from '../components/post/previewImg';

type ContentParsingOfTranslateProps = {
  showTranslate?: boolean;
  itemData: any;
  [propName: string]: any;
  callback?: Function;
  translateData?: TranslateInfo;
  translateForwardData?: TranslateInfo;
  mode?: 'preview' | 'detail';
  rows?: number;
  showPrview?: Boolean;
};

const ContentParsingOfTranslate: React.FC<ContentParsingOfTranslateProps> = ({
  showTranslate,
  itemData = {},
  callback = () => {},
  translateData,
  translateForwardData,
  mode,
  rows,
  showPrview,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      {itemData.content ? (
        <>
          <ContentParsing
            mode={mode}
            rows={rows}
            tribe_id={itemData.tribe_id}
            content={
              // 原文和译文一起显示
              showTranslate
                ? itemData.content // 显示原文
                : translateData?.showTranslate
                ? translateData?.content || itemData.content
                : itemData.content
            }
            callback={(type: MoreOperatorEnum) => {
              callback(itemData, type);
            }}
            imgList={itemData.image_list}
          />
          {showPrview && <PreviewImg list={itemData.image_list} />}
          <Box className='print-hide'>
            {showTranslate && !!translateData && (
              <>
                <Flex alignItems='center'>
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (translateData.status === FetchStatus.NOT_FETCHED) {
                        dispatch(fetchPostTranslateAsync([itemData.id]));
                      }
                      if (
                        translateForwardData?.status === FetchStatus.NOT_FETCHED
                      ) {
                        dispatch(
                          fetchPostTranslateAsync([itemData?.forward?.post_id]),
                        );
                      }
                      dispatch(
                        changePostTranslateState({
                          id: itemData.id,
                          showTranslate: !translateData?.showTranslate,
                        }),
                      );
                      callback(
                        {
                          ...itemData,
                        },
                        MoreOperatorEnum.TRANSLATE,
                      );
                    }}
                    padding='0'
                    variant='text'
                  >
                    <TranslateIcon />
                  </Button>
                  {translateData?.showTranslate && (
                    <Text fontSize='12px' color='textPrimary' ml='1em'>
                      <Link to='/set/preference'>
                        {t('Translate setting')}
                        <Text
                          color='textPrimary'
                          fontSize='12px'
                          style={{
                            display: 'inline-block',
                            transform: 'rotateY(45deg)',
                          }}
                          as='span'
                        >
                          &gt;
                        </Text>
                      </Link>
                    </Text>
                  )}
                </Flex>
                {translateData?.showTranslate && (
                  <ContentParsing
                    tribe_id={itemData.tribe_id}
                    mode={mode}
                    content={translateData?.content}
                    callback={(type: MoreOperatorEnum) => {
                      callback(itemData, type);
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </>
      ) : (
        <Flex>
          <Text color='textTips'>
            {t(
              "You haven't joined / pledged the current tribe. You can't view the current post.",
            )}
          </Text>
          <LinkExternal
            color='textPrimary'
            href={`/tribe/detail?id=${itemData.tribe_id}`}
            external
          >
            {t('To join / pledge')}
          </LinkExternal>
        </Flex>
      )}
    </>
  );
};

export default ContentParsingOfTranslate;
