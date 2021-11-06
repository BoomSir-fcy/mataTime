import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import { toast } from 'react-toastify';
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
  const { show, onClose, pid, onQuery } = props
  const [complainContent, setComplainContent] = useState<string[]>([
    '我对这条信息不甘感兴趣',
    '可疑内容或垃圾信息',
    '敏感照片或视频',
    '侮辱性或危害性',
    '表达了自我伤害或自杀的意图'
  ]);

  // 举报
  const onComplainPostRequest = async (content: string) => {
    const res = await Api.AttentionApi.complainPost(pid, content);
    if (Api.isSuccess(res)) {
      toast.success('举报成功！')
      onQuery()
    } else {
      toast.error(res.msg || '举报失败！')
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
                <h4>举报信息</h4>
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