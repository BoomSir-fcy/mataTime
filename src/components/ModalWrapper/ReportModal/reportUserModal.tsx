import React from 'react';
import { Flex, Button, Text } from 'uikit';
import { Icon } from 'components';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper,
  ModalContent
} from './style';

import { Api } from 'apis';
import { useImmer } from 'use-immer';

export const ReportUserModal: React.FC<{
  visible: boolean;
  userInfo: {
    uid: number;
  };
  onClose: Function;
}> = React.memo(({ visible, userInfo, onClose }) => {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    content: ''
  });

  // 举报
  const complainPostRequest = async () => {
    try {
      const res = await Api.MeApi.reportUser(userInfo.uid, state.content);
      if (Api.isSuccess(res)) {
        onClose();
        toast.success(t('ReportModalSuccess'));
      } else {
        toast.error(res.data || t('ReportModalError'));
      }
    } catch (error) {}
  };

  return (
    <>
      {visible && (
        <ModalWrapper>
          <ReportModalWrapper>
            <ModalTitleWrapper>
              <Text fontWeight="bold" fontSize="18px">
                {t('complaintTitle')}
              </Text>
              <Button
                variant="text"
                className="close"
                onClick={() => onClose()}
              >
                <Icon name={'icon-guanbi'}></Icon>
              </Button>
            </ModalTitleWrapper>
            <ModalContent>
              <Text color="textTips" fontSize="14px">
                {t('complaintTips')}
              </Text>
              <textarea
                placeholder={t('complaintTextarea')}
                onChange={event =>
                  setState(p => {
                    p.content = event.target.value;
                  })
                }
              ></textarea>
              <Flex justifyContent="space-around">
                <Button
                  scale="md"
                  disabled={state.content.length <= 0}
                  onClick={() => complainPostRequest()}
                >
                  {t('modalQuery')}
                </Button>
                <Button variant="secondary" onClick={() => onClose()}>
                  {t('modalCancel')}
                </Button>
              </Flex>
            </ModalContent>
          </ReportModalWrapper>
        </ModalWrapper>
      )}
    </>
  );
});
