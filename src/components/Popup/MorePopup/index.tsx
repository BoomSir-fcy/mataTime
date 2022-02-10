import React, { useState, useEffect } from 'react';
import { ReportModal, EditTwitterModal, CommonInquiryModal } from 'components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { PopupWrapper, PopupContentWrapper } from './style';

import { Api } from 'apis';
import { copyContent } from 'utils/copy';

export enum MoreOperatorEnum {
  SHIELD = 'SHIELD', // 屏蔽
  SETTOP = 'SETTOP',
  CANCEL_SETTOP = 'CANCEL_SETTOP',
  DELPOST = 'DELPOST',
  FOLLOW = 'FOLLOW',
  CANCEL_FOLLOW = 'CANCEL_FOLLOW',
  COMMONT = 'COMMONT',
  EXPAND = 'EXPAND', // 折叠展开
  LIKE = 'LIKE', // 点赞
  BOOKMARK = 'BOOKMARK', // 收藏
  BLOCKUSER = 'BLOCKUSER', // 屏蔽用户
  TRANSLATE = 'TRANSLATE', // 翻译
  FORWARD = 'FORWARD', // 转发
  UNFORWARD = 'UNFORWARD', // 取消转发
}

type Iprops = {
  data: any;
  children: React.ReactElement;
  callback?: Function;
};

export const MorePopup = React.memo((props: Iprops) => {
  const { t } = useTranslation();
  const UID = useSelector((state: any) => state.loginReducer.userInfo.uid);

  const { children, data, callback = () => {} } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [reportShow, setReportShow] = useState<boolean>(false);
  const [editShow, setEditShow] = useState<boolean>(false);
  const [isOwn, setIsOwn] = useState<boolean>(false);

  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [inqueryType, setInqueryType] = useState<string>('shield');

  useEffect(() => {
    init();
  }, [props.data]);

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
          is_fav: 1,
        },
      });
      toast.success(t('moreCollectionSuccess'));
    }
    setVisible(false);
  };

  // 取消收藏
  const onFavCancelRequest = async (post_id: number) => {
    const res = await Api.ContentApi.onFavCancel(post_id);
    if (Api.isSuccess(res)) {
      callback({
        ...data,
        post: {
          ...data.post,
          is_fav: 0,
        },
      });
      toast.success(t('moreCancelCollectionSuccess'));
    }
    setVisible(false);
  };

  const parseComments = value => {
    let topic = '';
    value.replace(/[#＃][^#＃]+[#＃]/g, word => {
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
      console.error(err);
    }

    const text = render(context).join('');
    const url = `${window.location.origin}/articledetils/${data.post.post_id}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${text.replace(
        /#/g,
        '',
      )}&hashtags=${parseComments(text)}&url=${url}`,
    );
    setVisible(false);
  };

  // 屏蔽
  const onShieldRequest = async (pid: number) => {
    const res = await Api.AttentionApi.addShield(pid);
    if (Api.isSuccess(res)) {
      callback(data, MoreOperatorEnum.SHIELD);
      toast.success(t('shieldModalShieldSuccess'));
    } else {
      toast.error(res.data || t('shieldModalShieldError'));
    }
  };

  // 置顶
  const onTopPostRequest = async (pid: number) => {
    const res = await Api.AttentionApi.setTopPost(pid);
    if (Api.isSuccess(res)) {
      callback(data, MoreOperatorEnum.SETTOP);
      toast.success(t('moreTopSuccess'));
    }
    setVisible(false);
  };

  // 取消置顶
  const onCancelTopPostRequest = async (pid: number) => {
    const res = await Api.AttentionApi.cancelTopPost(pid);
    if (Api.isSuccess(res)) {
      callback(data, MoreOperatorEnum.CANCEL_SETTOP);
      toast.success(t('moreCancelTopSuccess'));
    }
    setVisible(false);
  };

  // 关注用户
  const onAttentionFocusRequest = async (focus_uid: number) => {
    const res = await Api.AttentionApi.onAttentionFocus(focus_uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data);
      callback({ ...data, is_attention: 1 }, MoreOperatorEnum.FOLLOW);
    }
  };

  // 取消关注
  const onAttentionCancelRequest = async (focus_uid: number) => {
    const res = await Api.AttentionApi.cancelAttentionFocus(focus_uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data);
      callback({ ...data, is_attention: 0 }, MoreOperatorEnum.FOLLOW);
    }
  };

  // 删除
  const onPostDelRequest = async (pid: number) => {
    const res = await Api.AttentionApi.delV2Post(pid);
    if (Api.isSuccess(res)) {
      callback(data, MoreOperatorEnum.DELPOST);
      toast.success(t('moreDeleteSuccess'));
    }
    setVisible(false);
  };

  useEffect(() => {
    const fn = e => {
      setVisible(false);
    };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);

  return (
    <>
      <PopupWrapper
        onClick={(e: any) => {
          e.stopPropagation();
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
      >
        {children}
        {visible ? (
          <PopupContentWrapper id='more-popup-content'>
            {isOwn ? (
              <>
                <p
                  onClick={() => {
                    setInqueryType('delete');
                    setCommonInqueryShow(true);
                  }}
                >
                  {t('moreDelete')}
                </p>
                <p
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
                </p>
              </>
            ) : null}

            {!isOwn && data.is_attention === 0 ? (
              <p
                onClick={() => {
                  onAttentionFocusRequest(data.user_id);
                }}
              >
                {t('followText')} Ta
              </p>
            ) : !isOwn && data.is_attention === 1 ? (
              <p
                onClick={() => {
                  onAttentionCancelRequest(data.user_id);
                }}
              >
                {t('followCancelText')} Ta
              </p>
            ) : null}
            {/* <p
              onClick={() => {
                onShareTwitterClick();
              }}
            >
              {t('moreShareTwitter')}
            </p> */}
            <p
              onClick={() => {
                copyContent(
                  process.env.REACT_APP_WEB_URL +
                    '/articledetils/' +
                    data.post.post_id || '',
                );
              }}
            >
              {t('moreCopyAddress')}
            </p>

            {!isOwn ? (
              <>
                <p
                  onClick={() => {
                    data.post.is_fav === 1
                      ? onFavCancelRequest(data.post.post_id)
                      : onFavAgreeRequest(data.post.post_id);
                  }}
                >
                  {data.post.is_fav === 1
                    ? t('moreCancelCollection')
                    : t('moreCollection')}
                </p>
                <p
                  onClick={() => {
                    setVisible(false);
                    setReportShow(true);
                  }}
                >
                  {t('moreReport')}
                </p>
                {/* <p
                  onClick={() => {
                    setInqueryType('shield');
                    setCommonInqueryShow(true);
                  }}
                >
                  {t('moreShield')}
                </p> */}
                <p
                  onClick={() => {
                    callback(data, MoreOperatorEnum.BLOCKUSER);
                  }}
                >
                  {t('popupShieldUser')}
                </p>
              </>
            ) : null}
          </PopupContentWrapper>
        ) : null}
      </PopupWrapper>
      {/* 举报 */}
      <ReportModal
        show={reportShow}
        pid={data.post.post_id}
        onClose={() => {
          setVisible(false);
          setReportShow(false);
        }}
        onQuery={() => {
          setReportShow(false);
          callback(data);
          setVisible(false);
        }}
      />
      {/* 屏蔽推特 */}
      {/* <ShieldModal
        show={shieldShow}
        pid={data.post.post_id}
        onClose={() => {
          setShieldShow(false)
          setVisible(false)
        }}
        onQuery={() => {
          setShieldShow(false)
          callback(data, MoreOperatorEnum.SHIELD)
          setVisible(false)
        }}
      ></ShieldModal> */}

      {/* 统一询问框 */}
      <CommonInquiryModal
        show={commonInqueryShow}
        type={inqueryType}
        onClose={() => {
          setCommonInqueryShow(false);
          setVisible(false);
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
          setVisible(false);
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
    </>
  );
});
