import React, { useState, useEffect } from 'react';
import { ReportModal, EditTwitterModal, CommonInquiryModal ,CommentModal} from 'components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { PopupWrapper, PopupContentWrapper } from './style';
import { Api } from 'apis';

type Iprops = {
  data: any;
  children: React.ReactElement;
  callback?: Function;
  postUserId?: string | number;
};

export const CommentPop = React.memo((props: Iprops) => {
  const { t } = useTranslation();
  const UID = useSelector((state: any) => state.loginReducer.userInfo.uid);
  const { children, data = {}, callback = () => { }, postUserId = '' } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [inqueryType, setInqueryType] = useState<string>('deleteComment');

  // const [isShowDel, setIsShowDel] = useState<boolean>(false);
  useEffect(() => {
    init();
  }, []);

  //  初始化
  const init = () => {
    setIsCurrentUser(UID === data.user_id || UID === postUserId)
  }
  const delComment = () => {
    Api.MeApi.removeContentDetail(data.id).then(res => {
      if (Api.isSuccess(res)) {
        console.log(res);
        callback()
        toast.success(t('moreDeleteSuccess'))
      } else {
        toast.success(t('moreDeleteError'))
      }
    })
  }
  const reportComment = () => {
    Api.MeApi.reportComment(data.id).then(res => {
      if (Api.isSuccess(res)) {
        console.log(res);
        callback()
        toast.success(t('ReportModalSuccess'))
      } else {
        toast.success(t('ReportModalError'))
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
        {/* <CommentModal contentText={t('delCommentTitle')} titleText={t('delCommentContent')} show={isShowDel} onClose={()=>{setIsShowDel(false)}} onQuery={delComment}/> */}
        {children}
        {visible  ? (
          <PopupContentWrapper>
          {isCurrentUser?
          <p onClick={() => {
            setInqueryType('deleteComment')
            setCommonInqueryShow(true);
          }}>{t('moreDelete')}</p>
          : null
        }
            <p onClick={()=>{
              setInqueryType('reportComment')
              setCommonInqueryShow(true);
            }
            }>{t('moreReport')}</p>
          </PopupContentWrapper>
            ) :null}
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
          if (inqueryType === 'reportComment') {
            // reportComment()
            console.log('哈哈哈');
            
          }
          setCommonInqueryShow(false);
          setVisible(false);
        }
        }
      ></CommonInquiryModal>
    </>
  );
});
