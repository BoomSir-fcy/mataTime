import React from 'react';
import useTheme from 'hooks/useTheme';
import { Text } from 'uikit';
import { Avatar, ModalOperator } from 'components';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';
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
  const { t, getHTML } = useTranslation();
  const { theme } = useTheme();
  const { show, onClose, title, params, confirm } = props;
  return (
    <>
      {show && (
        <ModalWrapper>
          <ReportModalWrapper>
            <ModalTitleWrapper>
              <Text fontWeight="bold" fontSize="18px" color="white_black">
                {title || t('meTitle')}
              </Text>
            </ModalTitleWrapper>
            <CancelAttentionContentWrapper>
              <Avatar scale="md" src={params.nft_image} />
              <div className="des-box">
                {getHTML('meUnsubscribeContent', {
                  value: `<span style="color:${
                    theme.colors.backgroundPrimary
                  }">${shortenAddress(params.address)}</span>`
                })}
              </div>
            </CancelAttentionContentWrapper>
            <ModalOperator onClose={onClose} onQuery={confirm} />
          </ReportModalWrapper>
        </ModalWrapper>
      )}
    </>
  );
});
