import React, { useState, useEffect } from 'react';
import { Icon, Editor } from 'components';
import { toast } from 'react-toastify';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper,
  ReportContentWrapper
} from './style';

type IProp = {
  show: boolean;
  onClose: Function;
  content?: any[];
}

export const EditTwitterModal = React.memo((props: IProp) => {
  const { show, onClose, content = [] } = props
  const sendArticle = () => {
  }
  return (
    <>
      {
        show ? (
          <ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4>编辑信息</h4>
                <div className="close" onClick={() => {
                  onClose()
                }}>
                  <Icon name={'icon-guanbi'} color={'#ffffff'}></Icon>
                </div>
              </ModalTitleWrapper>
              <ReportContentWrapper>
                <Editor type="post" initValue={content} sendArticle={sendArticle}></Editor>
              </ReportContentWrapper>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
});