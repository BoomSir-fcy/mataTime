import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import { toast } from 'react-toastify';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper,
  ReportContentWrapper
} from './style';

type IProp = {
  show: boolean;
  pid: number;
  onClose: Function;
  onQuery: Function;
}

export const EditTwitterModal = React.memo((props: IProp) => {
  const { show, onClose, pid, onQuery } = props
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



              </ReportContentWrapper>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
});