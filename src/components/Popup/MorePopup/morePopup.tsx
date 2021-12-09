import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Text } from 'uikit';
import { ReportModal, EditTwitterModal, CommonInquiryModal } from 'components';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';

import { Api } from 'apis';
import { copyContent } from 'utils/copy';

type Iprops = {
  data: any;
  callback?: (event: any, type?: string) => void;
};

enum MoreOperatorEnum {
  SHIELD = 'SHIELD', // 屏蔽
  SETTOP = 'SETTOP',
  CANCEL_SETTOP = 'CANCEL_SETTOP',
  DELPOST = 'DELPOST',
  FOLLOW = 'FOLLOW',
  CANCEL_FOLLOW = 'CANCEL_FOLLOW',
  COMMONT = 'COMMONT'
}

const PopupWrapper = styled(Box)`
  width: 150px;
  background: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px 30px;
  div {
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 36px;
    cursor: pointer;
  }
`;

export const MorePostPopup: React.FC<Iprops> = React.memo(
  ({ data, callback }) => {
    const { t } = useTranslation();
    const { toastSuccess, toastError } = useToast();
    const [reportShow, setReportShow] = useState<boolean>(false);
    const [editShow, setEditShow] = useState<boolean>(false);
    const [isOwn, setIsOwn] = useState<boolean>(false);
    const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
    const [inqueryType, setInqueryType] = useState<string>('shield');
    const UID = useStore(p => p.loginReducer.userInfo.uid);

    useEffect(() => {
      init();
    }, [data]);

    //  初始化
    const init = () => {
      UID === data.post.user_id ? setIsOwn(true) : setIsOwn(false);
    };

    // 收藏
    const onFavAgreeRequest = async (post_id: number) => {
      const res = await Api.ContentApi.onFavAgree(post_id);
      if (Api.isSuccess(res)) {
        callback({
          ...data,
          post: {
            ...data.post,
            is_fav: 1
          }
        });
        toastSuccess(t('moreCollectionSuccess'));
      } else {
        toastError(res.msg || t('moreCollectionError'));
      }
    };

    // 取消收藏
    const onFavCancelRequest = async (post_id: number) => {
      const res = await Api.ContentApi.onFavCancel(post_id);
      if (Api.isSuccess(res)) {
        callback({
          ...data,
          post: {
            ...data.post,
            is_fav: 0
          }
        });
        toastSuccess(t('moreCancelCollectionSuccess'));
      } else {
        toastError(res.msg || t('moreCancelCollectionError'));
      }
    };

    const parseComments = value => {
      let topic = '';
      value.replace(/[#＃][^#＃]+[#＃]/g, word => {
        console.log(word);
        topic = word.slice(1).slice(0, -1);
      });
      return topic;
    };

    let arr = [];
    const render = newarr => {
      let len = newarr.length;
      for (let i = 0; i < len; i++) {
        if (newarr[i].text) {
          arr.push(newarr[i].text);
        }
        if (newarr[i].children?.length > 0) {
          render(newarr[i].children);
        }
      }
      return arr;
    };

    // 分享到Twitter
    const onShareTwitterClick = () => {
      let context = [];
      try {
        context = Array.isArray(JSON.parse(data.content))
          ? JSON.parse(data.content)
          : [];
      } catch (err) {
        console.log(err);
      }

      const text = render(context).join('');
      const url = `${window.location.origin}/articleDetils/${data.post.post_id}`;
      window.open(
        `https://twitter.com/intent/tweet?text=${text.replace(
          /#/g,
          ''
        )}&hashtags=${parseComments(text)}&url=${url}`
      );
    };

    // 屏蔽
    const onShieldRequest = async (pid: number) => {
      const res = await Api.AttentionApi.addShield(pid);
      if (Api.isSuccess(res)) {
        callback(data, MoreOperatorEnum.SHIELD);
        toastSuccess(t('shieldModalShieldSuccess'));
      } else {
        toastError(res.data || t('shieldModalShieldError'));
      }
    };

    // 置顶
    const onTopPostRequest = async (pid: number) => {
      const res = await Api.AttentionApi.setTopPost(pid);
      if (Api.isSuccess(res)) {
        callback(data, MoreOperatorEnum.SETTOP);
        toastSuccess(t('moreTopSuccess'));
      } else {
        toastError(res.data || t('moreTopError'));
      }
    };

    // 取消置顶
    const onCancelTopPostRequest = async (pid: number) => {
      const res = await Api.AttentionApi.cancelTopPost(pid);
      if (Api.isSuccess(res)) {
        callback(data, MoreOperatorEnum.CANCEL_SETTOP);
        toastSuccess(t('moreCancelTopSuccess'));
      } else {
        toastError(res.data || t('moreCancelTopError'));
      }
    };

    // 关注用户
    const onAttentionFocusRequest = async (focus_uid: number) => {
      const res = await Api.AttentionApi.onAttentionFocus(focus_uid);
      if (Api.isSuccess(res)) {
        toastSuccess(res.data);
        callback({ ...data, is_attention: 1 }, MoreOperatorEnum.FOLLOW);
      } else {
        toastError(res.data);
      }
    };

    // 取消关注
    const onAttentionCancelRequest = async (focus_uid: number) => {
      const res = await Api.AttentionApi.cancelAttentionFocus(focus_uid);
      if (Api.isSuccess(res)) {
        toastSuccess(res.data);
        callback({ ...data, is_attention: 0 }, MoreOperatorEnum.FOLLOW);
      } else {
        toastError(res.data);
      }
    };

    // 删除
    const onPostDelRequest = async (pid: number) => {
      const res = await Api.AttentionApi.delPost(pid);
      if (Api.isSuccess(res)) {
        callback(data, MoreOperatorEnum.DELPOST);
        toastSuccess(t('moreDeleteSuccess'));
      } else {
        toastError(res.data || t('moreDeleteError'));
      }
    };

    return (
      <React.Fragment>
        <PopupWrapper>
          {isOwn && (
            <>
              <Text
                onClick={() => {
                  setInqueryType('delete');
                  setCommonInqueryShow(true);
                }}
              >
                {t('moreDelete')}
              </Text>
              <Text
                onClick={() => {
                  if (data.post.is_top === 1) {
                    setInqueryType('cancelTopping');
                    setCommonInqueryShow(true);
                  } else {
                    setInqueryType('topping');
                    setCommonInqueryShow(true);
                  }
                }}
              >
                {data.post.is_top === 1 ? t('moreCancelTop') : t('moreTop')}
              </Text>
            </>
          )}

          {!isOwn && data.is_attention === 0 ? (
            <Text onClick={() => onAttentionFocusRequest(data.user_id)}>
              {t('followText')} Ta
            </Text>
          ) : (
            <Text onClick={() => onAttentionCancelRequest(data.user_id)}>
              {t('followCancelText')} Ta
            </Text>
          )}
          {/* <Text
              onClick={() => {
                onShareTwitterClick();
              }}
            >
              {t('moreShareTwitter')}
            </Text> */}
          <Text
            onClick={() => {
              copyContent(
                `${window.location.origin}/articleDetils/${
                  data.post.post_id || ''
                }`
              );
              callback({ ...data });
            }}
          >
            {t('moreCopyAddress')}
          </Text>

          {!isOwn && (
            <>
              <Text
                onClick={() => {
                  data.post.is_fav === 1
                    ? onFavCancelRequest(data.post.post_id)
                    : onFavAgreeRequest(data.post.post_id);
                }}
              >
                {data.post.is_fav === 1
                  ? t('moreCancelCollection')
                  : t('moreCollection')}
              </Text>
              <Text
                onClick={() => {
                  setReportShow(true);
                }}
              >
                {t('moreReport')}
              </Text>
              <Text
                onClick={() => {
                  setInqueryType('shield');
                  setCommonInqueryShow(true);
                }}
              >
                {t('moreShield')}
              </Text>
            </>
          )}
        </PopupWrapper>

        {/* 举报 */}
        <ReportModal
          show={reportShow}
          pid={data.post.post_id}
          onClose={() => {
            setReportShow(false);
          }}
          onQuery={() => {
            setReportShow(false);
            callback(data);
          }}
        />

        {/* 统一询问框 */}
        <CommonInquiryModal
          show={commonInqueryShow}
          type={inqueryType}
          onClose={() => {
            setCommonInqueryShow(false);
          }}
          onQuery={() => {
            if (inqueryType === 'shield') {
              onShieldRequest(data.post.post_id);
            }
            if (inqueryType === 'topping') {
              onTopPostRequest(data.post.post_id);
            }
            if (inqueryType === 'cancelTopping') {
              onCancelTopPostRequest(data.post.post_id);
            }
            if (inqueryType === 'delete') {
              onPostDelRequest(data.post.post_id);
            }
            setCommonInqueryShow(false);
          }}
        />

        {/* 编辑twitter */}
        <EditTwitterModal
          show={editShow}
          content={data.post.content}
          onClose={() => {
            setEditShow(false);
          }}
        />
      </React.Fragment>
    );
  }
);
