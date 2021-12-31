import React from 'react';
import { Box, Text } from 'uikit';
import { Avatar, ModalWrapper, ModalOperator } from 'components';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

import useTheme from 'hooks/useTheme';
import { useDispatch } from 'react-redux';
import { storeAction } from 'store';


type IProp = {
  show: boolean;
  title?: string;
  onClose?: () => void;
  confirm?: () => void;
};

const ClearModal = React.memo((props: IProp) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { show, onClose, title, confirm } = props;
  const dispatch = useDispatch();

  return (
    <ModalWrapper
      creactOnUse
      title={title || t('Clear all recent searches？')}
      visible={show}
      setVisible={onClose}
    >
      <Text mb="32px" maxWidth="413px">{t('This can’t be undone and you’ll remove all your recent searches')}</Text>
      <ModalOperator queryText={t('Clear')} onClose={onClose} onQuery={() => {
        dispatch(storeAction.clearSearchHistoryData())
        onClose()
      }} />
    </ModalWrapper>
  );
});

export default ClearModal
