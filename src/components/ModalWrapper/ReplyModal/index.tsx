import React from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'hooks';
import { Icon, Editor, Avatar, ModalWrapper } from 'components';
import { Input } from 'uikit'

import { useTranslation } from 'contexts/Localization';
import { Api } from 'apis';
import {
  ReportModalWrapper,
  ReportContentWrapper,
  ReplyTargetWrapper,
  ReplyConentWrapper
} from './style';
import MentionItem from 'view/News/components/MentionItem';

type IProp = {
  show: boolean;
  itemData: any;
  replyType: string;
  commentId?: string;
  postId?: string;
  onClose: () => void;
};

export const ReplyModal = React.memo((props: IProp) => {
  const userInfo = useSelector((state: any) => state.loginReducer.userInfo);
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const {
    show,
    onClose,
    itemData,
    replyType,
    commentId = '',
    postId = ''
  } = props;

  // 评论
  const sendArticle = (res, imags_list, remind_user) => {
    if (!res) return;
    if (replyType === 'comment') {
      // 针对评论
      Api.CommentApi.createComment({
        pid: postId,
        comment_id: commentId,
        comment: res,
        remind_user
      }).then(res => {
        if (Api.isSuccess(res)) {
          toastSuccess(res.data);
          onClose();
        } else {
          toastError(t('commonContactAdmin') || res.msg);
        }
      });
    }

    if (replyType === 'twitter') {
      // 针对推文
      Api.CommentApi.createComment({
        pid: postId,
        comment: res,
        remind_user
      }).then(res => {
        if (Api.isSuccess(res)) {
          toastSuccess(res.data);
          onClose();
        } else {
          toastError(t('commonContactAdmin') || res.msg);
        }
      });
    }
  };

  return (
    <ModalWrapper creactOnUse visible={show} setVisible={onClose} top="40%">
      <ReportModalWrapper>
        <ReportContentWrapper>
          <ReplyTargetWrapper>
            <MentionItem
              dontShowPic
              itemData={replyType === 'twitter' ? itemData : itemData.comment}
              more={false}
            />
          </ReplyTargetWrapper>
          <ReplyConentWrapper>
            <div className="left">
              <Avatar className="avatar" src={userInfo.nft_image} scale="md" />
            </div>
            <div className="right">
              <Editor type="comment" sendArticle={sendArticle} />
            </div>
          </ReplyConentWrapper>
        </ReportContentWrapper>
      </ReportModalWrapper>
    </ModalWrapper>
  );
});
