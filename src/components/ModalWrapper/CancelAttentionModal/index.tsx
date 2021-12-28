import React from 'react';
import { Box, Text } from 'uikit';
import { Avatar, ModalWrapper, ModalOperator } from 'components';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';
import { ModalTitleWrapper, ReportModalWrapper } from '../ReportModal/style';

import useTheme from 'hooks/useTheme';

import { CancelAttentionContentWrapper } from './style';

type IProp = {
  show: boolean;
  title: string;
  params: {
    uid: number;
    address: string;
    nft_image: string;
  };
  onClose: () => void;
  confirm: () => void;
};

export const CancelAttentionModal = React.memo((props: IProp) => {
  const { t, getHTML } = useTranslation();
  const { theme } = useTheme();
  const { show, onClose, title, params, confirm } = props;
  return (
    <ModalWrapper
      creactOnUse
      title={title || t('meTitle')}
      visible={show}
      setVisible={onClose}
    >
      <ReportModalWrapper>
        <CancelAttentionContentWrapper>
          <Avatar disableFollow scale='md' src={params.nft_image} />
          <div className='des-box'>
            {getHTML('meUnsubscribeContent', {
              value: `<span style="color:${
                theme.colors.backgroundPrimary
              }">@${shortenAddress(params.address)}</span>`,
            })}
          </div>
        </CancelAttentionContentWrapper>
        <ModalOperator onClose={onClose} onQuery={confirm} />
      </ReportModalWrapper>
    </ModalWrapper>
  );
});
