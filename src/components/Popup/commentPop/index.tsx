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
};

export const CommentPop = React.memo((props: Iprops) => {
  const { t } = useTranslation();
  const UID = useSelector((state: any) => state.loginReducer.userInfo.uid);
  const { children, data={}, callback = () => {} } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [isShowDel, setIsShowDel] = useState<boolean>(false);
  const [isCurrentUser,setIsCurrentUser] = useState(false)
  useEffect(() => {
    init();
  }, []);

  //  初始化
  const init = () => {
    setIsCurrentUser(UID === data.user_id)
  }
const  delComment = ()=>{
  Api.MeApi.removeContentDetail(data.id).then(res=>{
    if(Api.isSuccess(res)){
      callback()
      toast.success(t('moreDeleteSuccess'))
    }else{
      toast.success(res.msg)
      toast.success(t('moreDeleteError'))
    }
  })
  setIsShowDel(false)
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
        <CommentModal contentText={t('delCommentTitle')} titleText={t('delCommentContent')} show={isShowDel} onClose={()=>{setIsShowDel(false)}} onQuery={delComment}/>
        {children}
        {visible&&isCurrentUser ? (
          <PopupContentWrapper>
              <p onClick={()=>setIsShowDel(true)}>{t('moreDelete')}</p>
          </PopupContentWrapper>
        ) :null}
      </PopupWrapper>
  );
});
