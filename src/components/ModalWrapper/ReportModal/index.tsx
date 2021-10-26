import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper,
  ReportContentWrapper
} from './style';

type IProp = {
  show: boolean;
  onClose: Function;
}

export const ReportModal = React.memo((props: IProp) => {
  const { show, onClose } = props
  return (
    <>
      {
        show ? (
          <ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4>举报信息</h4>
                <div className="close" onClick={() => {
                  onClose()
                }}>
                  <Icon name={'icon-guanbi'} color={'#ffffff'}></Icon>
                </div>
              </ModalTitleWrapper>
              <ReportContentWrapper>
                <p>我对这条信息不甘感兴趣</p>
                <p>可疑内容或垃圾信息</p>
                <p>敏感照片或视频</p>
                <p>侮辱性或危害性</p>
                <p>表达了自我伤害或自杀的意图</p>
              </ReportContentWrapper>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
});