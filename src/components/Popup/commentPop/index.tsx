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
  const { children, data={}, callback = () => {} } = props;
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    init();
  }, []);

  //  初始化
  const init = () => {
    console.log(data);
    
    // UID === data.post.user_id
  }
const  delComment = ()=>{
  Api.MeApi.removeContentDetail(data.id).then(res=>{
    if(Api.isSuccess(res)){
      console.log(res);
      callback()
      toast.success('删除成功')
    }else{
      toast.success(res.msg)
    }
  })
}
const  reportComment = ()=>{
  Api.MeApi.reportComment(data.id).then(res=>{
    if(Api.isSuccess(res)){
      console.log(res);
      callback()
      toast.success('举报成功')
    }else{
      toast.success(res.msg)
    }
  })
}
  useEffect(() => {
    const fn = (e)=>{
      setVisible(false)
    }
    document.addEventListener('click',fn)
    return ()=>document.removeEventListener('click',fn)
  })
  return (
      <PopupWrapper
        onClick={(e: any) => {
          e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
          setVisible(!visible);
        }}
      >
        {children}
        {visible ? (
          <PopupContentWrapper>
            <p onClick={delComment}>{t('moreDelete')}</p>
            <p onClick={reportComment}>{t('moreReport')}</p>
          </PopupContentWrapper>
        ) : null}
      </PopupWrapper>
  );
});