import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { Icon, CommonInquiryModal } from 'components';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';

import { Api } from 'apis';
import { copyContent } from 'utils/copy';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import Popup from 'reactjs-popup';

type Iprops = {
  data: any;
  ref?: any;
  callback?: (event: any, type?: string) => void;
};

enum TribeMoreOperatorEnum {
  SHIELD = 'SHIELD', // 屏蔽
  SETTOP = 'SETTOP',
  CANCEL_SETTOP = 'CANCEL_SETTOP',
  DELPOST = 'DELPOST',
  FOLLOW = 'FOLLOW',
  CANCEL_FOLLOW = 'CANCEL_FOLLOW',
  COMMONT = 'COMMONT',
  LIKE = 'LIKE', // 点赞
  BOOKMARK = 'BOOKMARK', // 收藏
  BLOCKUSER = 'BLOCKUSER', // 屏蔽用户
  FEATURED = 'FEATURED', // 精选
  CANCEL_FEATURED = 'CANCEL_FEATURED', // 取消精选
  MUTE = 'MUTE', // 禁言
  CANCEL_MUTE = 'CANCEL_MUTE', // 取消禁言
}

const PopupWrapper = styled(Box)`
  width: 150px;
  background: ${({ theme }) => theme.colors.greyBackground};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px 30px;
  margin-top: -1px;
  margin-left: 4px;
  div {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    line-height: 36px;
    cursor: pointer;
  }
`;

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

export const SetTribePopup: React.FC<Iprops> = React.memo(
  ({ data, ref, callback }) => {
    const { t } = useTranslation();
    const { toastSuccess, toastError } = useToast();
    const [reportShow, setReportShow] = useState<boolean>(false);
    const [editShow, setEditShow] = useState<boolean>(false);
    const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
    const [inqueryType, setInqueryType] = useState<string>('TribeTopping');
    const UID = useStore(p => p.loginReducer.userInfo.uid);
    const theme = useTheme();

    const [state, setState] = useImmer({
      cancelFollow: false,
    });

    // useEffect(() => {
    //   init();
    // }, [data]);

    // //  初始化
    // const init = () => {};

    // 置顶
    const onTopPostRequest = async (pid: number) => {
      const res = await Api.TribeApi.tribePostSetTop({ pid });
      if (Api.isSuccess(res)) {
        callback(data, TribeMoreOperatorEnum.SETTOP);
        toastSuccess(t('moreTopSuccess'));
      }
    };

    // 取消置顶
    const onCancelTopPostRequest = async (pid: number) => {
      const res = await Api.TribeApi.tribePostSetNotTop({ pid });
      if (Api.isSuccess(res)) {
        callback(data, TribeMoreOperatorEnum.CANCEL_SETTOP);
        toastSuccess(t('moreCancelTopSuccess'));
      }
    };

    // 精选
    const onPostSelected = async (pid: number) => {
      const res = await Api.TribeApi.tribePostSetSelected({ pid });
      if (Api.isSuccess(res)) {
        callback(data, TribeMoreOperatorEnum.FEATURED);
        toastSuccess(t('精选成功'));
      }
    };

    // 取消精选
    const onPostNotSelected = async (pid: number) => {
      const res = await Api.TribeApi.tribePostSetNotSelected({ pid });
      if (Api.isSuccess(res)) {
        callback(data, TribeMoreOperatorEnum.CANCEL_FEATURED);
        toastSuccess(t('取消精选成功'));
      }
    };

    // 帖子禁言
    const onPostMute = async (tribe_id: number, uid: number) => {
      const res = await Api.TribeApi.tribePostMute({ tribe_id, uid });
      if (Api.isSuccess(res)) {
        callback(data, TribeMoreOperatorEnum.MUTE);
        toastSuccess(t('禁言成功'));
      }
    };

    // 帖子取消禁言
    const onPostNotMute = async (tribe_id: number, uid: number) => {
      const res = await Api.TribeApi.tribePostNotMute({ tribe_id, uid });
      if (Api.isSuccess(res)) {
        callback(data, TribeMoreOperatorEnum.CANCEL_MUTE);
        toastSuccess(t('取消禁言成功'));
      }
    };

    // 删除
    const onPostDelRequest = async (pid: number) => {
      const res = await Api.TribeApi.tribePostDelete({ pid });
      if (Api.isSuccess(res)) {
        callback(data, TribeMoreOperatorEnum.DELPOST);
        toastSuccess(t('moreDeleteSuccess'));
      }
    };

    return (
      <React.Fragment>
        <Popup
          ref={ref}
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
          <PopupWrapper>
            <Text
              textTransform='capitalize'
              onClick={() => {
                setInqueryType('delete');
                setCommonInqueryShow(true);
              }}
            >
              {t('moreDelete')}
            </Text>
            <Text
              textTransform='capitalize'
              onClick={() => {
                if (data.is_top === 1) {
                  setInqueryType('cancelTopping');
                  setCommonInqueryShow(true);
                } else {
                  setInqueryType('TribeTopping');
                  setCommonInqueryShow(true);
                }
              }}
            >
              {data.is_top === 1 ? t('moreCancelTop') : t('moreTop')}
            </Text>
            <Text
              textTransform='capitalize'
              onClick={() => {
                if (data.selected) {
                  onPostNotSelected(data.id);
                } else {
                  onPostSelected(data.id);
                }
              }}
            >
              {data.selected === 0 ? t('精选') : t('取消精选')}
            </Text>
            <Text
              textTransform='capitalize'
              onClick={() => {
                if (data.is_mute === 0) {
                  onPostMute(data.tribe_id, data.user_id);
                } else {
                  onPostNotMute(data.tribe_id, data.user_id);
                }
              }}
            >
              {data.is_mute === 0 ? t('禁言') : t('取消禁言')}
            </Text>
          </PopupWrapper>
        </Popup>

        {/* 统一询问框 */}
        <CommonInquiryModal
          show={commonInqueryShow}
          type={inqueryType}
          onClose={() => {
            setCommonInqueryShow(false);
          }}
          onQuery={() => {
            if (inqueryType === 'TribeTopping') {
              onTopPostRequest(data.id);
            }
            if (inqueryType === 'cancelTopping') {
              onCancelTopPostRequest(data.id);
            }
            if (inqueryType === 'delete') {
              onPostDelRequest(data.id);
            }
            setCommonInqueryShow(false);
          }}
        />
      </React.Fragment>
    );
  },
);
