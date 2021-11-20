import React, { useState, useEffect } from 'react';
import { Icon, Editor, Avatar } from 'components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import MentionItem from 'view/News/components/MentionItem';
import { Api } from 'apis';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper,
  ReportContentWrapper,
  ReplyTargetWrapper,
  ReplyConentWrapper
} from './style';

type IProp = {
  show: boolean;
  itemData: any;
  onClose: Function;
  replyType: string;
  commentId?: string;
  postId?: string;
}

export const ReplyModal = React.memo((props: IProp) => {
  const userInfo = useSelector((state: any) => state.loginReducer.userInfo);
  const { show, onClose, itemData, replyType, commentId = '', postId = '' } = props

  // 评论
  const sendArticle = (res, resetInput: () => void) => {
    if (!res) return
    if (replyType === 'comment') { // 针对评论
      Api.CommentApi.createComment({
        pid: postId,
        comment_id: commentId,
        comment: res,
      }).then(res => {
        if (Api.isSuccess(res)) {
          toast.success(res.data)
          onClose()
        }
      })
    }
    if (replyType === 'twitter') { // 针对推文
      Api.CommentApi.createComment({
        pid: postId,
        comment: res,
      }).then(res => {
        if (Api.isSuccess(res)) {
          toast.success(res.data)
          onClose()
        }
      })
    }

  }
  return (
    <>
      {
        show ? (
          <ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4></h4>
                <div className="close" onClick={() => {
                  onClose()
                }}>
                  <Icon name={'icon-guanbi'} color={'#ffffff'}></Icon>

                </div>
              </ModalTitleWrapper>
              <ReportContentWrapper>
                <ReplyTargetWrapper>
                  <MentionItem itemData={replyType === 'twitter' ? itemData : itemData.comment} more={false} />
                </ReplyTargetWrapper>
                <ReplyConentWrapper>
                  <div className="left">
                    <div className="img-box">
                      {/* <img src="" alt="" /> */}
                      <Avatar className="avatar" src={userInfo.nft_image} scale="md" />
                    </div>
                  </div>
                  <div className="right">
                    <Editor type="comment" sendArticle={sendArticle}></Editor>
                  </div>
                </ReplyConentWrapper>
              </ReportContentWrapper>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
});