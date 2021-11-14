import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization'
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper,
  ReportContentWrapper
} from './style';

import { Api } from 'apis';
import { iteratorSymbol } from 'immer/dist/internal';

type IProp = {
  show: boolean;
  pid: number;
  onClose: Function;
  onQuery: Function;
}

export const ReportModal = React.memo((props: IProp) => {
  const { t } = useTranslation()
  const { show, onClose, pid, onQuery } = props
  const [complainContent, setComplainContent] = useState<string[]>([
    t('ReportModalComplain1'),
    t('ReportModalComplain2'),
    t('ReportModalComplain3'),
    t('ReportModalComplain4'),
    t('ReportModalComplain5')
  ]);

  // 举报
  const onComplainPostRequest = async (content: string) => {
    const res = await Api.AttentionApi.complainPost(pid, content);
    if (Api.isSuccess(res)) {
      toast.success(t('ReportModalSuccess'))
      onQuery()
    } else {
      toast.error(res.msg || t('ReportModalError'))
      onClose()
    }
  }

  return (
    <>
      {
        show ? (
          <ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4>{t('ReportModalTitle')}</h4>
                <div className="close" onClick={() => {
                  onClose()
                }}>
                  <Icon name={'icon-guanbi'} color={'#ffffff'}></Icon>
                </div>
              </ModalTitleWrapper>
              <ReportContentWrapper>
                {
                  complainContent.map((item: any, index: number) => {
                    return <p key={index} onClick={() => {
                      onComplainPostRequest(item);
                    }}>{item}</p>
                  })
                }
              </ReportContentWrapper>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
});