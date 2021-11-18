import React from 'react';
import { Text } from 'uikit';
import { Avatar, ModalOperator } from 'components';
import { shortenAddress } from 'utils/contract';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper
} from '../ReportModal/style';

import { CancelAttentionContentWrapper } from './style';

type IProp = {
  show: boolean;
  title: string;
  params: {
    uid: number;
    address: string;
    nft_image: string;
  };
  onClose: Function;
  confirm: Function;
};

export const CancelAttentionModal = React.memo((props: IProp) => {
  const { show, onClose, title, params, confirm } = props;
  return (
    <>
      {show && (
        <ModalWrapper>
          <ReportModalWrapper>
            <ModalTitleWrapper>
              <Text fontWeight="bold" fontSize="18px" color="white_black">
                {title || '标题'}
              </Text>
            </ModalTitleWrapper>
            <CancelAttentionContentWrapper>
              <Avatar scale="md" src={params.nft_image} />
              <div className="des-box">
                取消关注用户
                <Text
                  color="backgroundPrimary"
                  style={{ display: 'inline-block' }}
                >
                  @{shortenAddress(params.address)}
                </Text>
                ，将无法获取Ta的最新动态、信息
              </div>
            </CancelAttentionContentWrapper>
            <ModalOperator onClose={onClose} onQuery={confirm} />
          </ReportModalWrapper>
        </ModalWrapper>
      )}
    </>
  );
});
