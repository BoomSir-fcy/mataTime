import React, { useState, useEffect } from 'react';
import { ReportModal, EditTwitterModal, CommonInquiryModal } from 'components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { PopupWrapper, PopupContentWrapper } from './style';
import { Api } from 'apis';

type Iprops = {
  data: any;
  children: React.ReactElement;
  callback?: Function;
};

export const CommentPop = React.memo((props: Iprops) => {
  const { t } = useTranslation();
  const UID = useSelector((state: any) => state.loginReducer.userInfo.uid);
  const { children, data = {}, callback = () => { } } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [inqueryType, setInqueryType] = useState<string>('deleteComment');

  useEffect(() => {
    init();
  }, []);

  //  初始化
  const init = () => {
    setIsCurrentUser(UID === data.user_id)
  }
  const delComment = () => {
    Api.MeApi.removeContentDetail(data.id).then(res => {
      if (Api.isSuccess(res)) {
        console.log(res);
        callback()
        toast.success('删除成功')
      } else {
        toast.success(res.msg)
      }
    })
  }
  const reportComment = () => {
    Api.MeApi.reportComment(data.id).then(res => {
      if (Api.isSuccess(res)) {
        console.log(res);
        callback()
        toast.success('举报成功')
      } else {
        toast.success(res.msg)
      }
    })
  }
  useEffect(() => {
    const fn = (e) => {
      setVisible(false)
    }
    document.addEventListener('click', fn)
    return () => document.removeEventListener('click', fn)
  })
  return (
    <>
      <PopupWrapper
        onClick={(e: any) => {
          e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
          setVisible(!visible);
        }}
      >
        {children}
        {visible && isCurrentUser ? (
          <PopupContentWrapper>
            <p onClick={() => {
              setCommonInqueryShow(true);
            }}>{t('moreDelete')}</p>
            {/* <p onClick={reportComment}>{t('moreReport')}</p> */}
          </PopupContentWrapper>
        ) : null}
      </PopupWrapper>

      {/* 统一询问框 */}
      <CommonInquiryModal
        show={commonInqueryShow}
        type={inqueryType}
        onClose={() => {
          setCommonInqueryShow(false);
          setVisible(false);
        }}
        onQuery={() => {
          if (inqueryType === 'deleteComment') {
            delComment()
          }
          setCommonInqueryShow(false);
          setVisible(false);
        }
        }
      ></CommonInquiryModal>
    </>
  );
});
