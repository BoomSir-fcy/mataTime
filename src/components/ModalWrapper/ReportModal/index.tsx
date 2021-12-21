import React, { useState, useEffect } from 'react';
import { ModalWrapper } from 'components';
import { useToast } from 'hooks';
import { Box } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { ReportContentWrapper, ReportModalWrapper } from './style';

import { Api } from 'apis';

type IProp = {
  show: boolean;
  pid: number;
  type?: 'comment' | 'post';
  onClose: () => void;
  onQuery: () => void;
};

export const ReportModal = React.memo((props: IProp) => {
  const { t } = useTranslation();
  const { show, onClose, pid, onQuery, type } = props;
  const { toastSuccess, toastError } = useToast();
  const [complainContent] = useState<string[]>([
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
      toastSuccess(t('ReportModalSuccess'));
      onQuery();
    } else {
      onClose();
    }
  };

  // 举报评论
  const onComplainComment = async (content: string) => {
    const res = await Api.MeApi.reportComment(pid, content);
    if (Api.isSuccess(res)) {
      toastSuccess(t('ReportModalSuccess'));
      onQuery();
    } else {
      onClose();
    }
  };

  return (
    <ModalWrapper
      creactOnUse
      title={t('ReportModalTitle')}
      visible={show}
      setVisible={onClose}
    >
      <ReportModalWrapper width="500px">
        <ReportContentWrapper>
          {complainContent.map((item: any, index: number) => {
            return (
              <p
                key={index}
                onClick={() => {
                  type === 'comment'
                    ? onComplainComment(item)
                    : onComplainPostRequest(item);
                }}
              >
                {item}
              </p>
            );
          })}
        </ReportContentWrapper>
      </ReportModalWrapper>
    </ModalWrapper>
  );
});
