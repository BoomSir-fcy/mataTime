import React from 'react';
import { ModalWrapper } from 'components';
import { Flex, Text, Button, Box } from 'uikit';
import styled from 'styled-components';

const Content = styled(Box)`
  padding: 15px 20px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 10px;
`;
const InviteModal: React.FC<{
  type?: number;
  visible?: boolean;
  setVisible?: () => void;
  t?: (key: string) => string;
  onCopyLink?: () => void;
}> = React.memo(({ type, visible, setVisible, t, onCopyLink }) => {
  return (
    <ModalWrapper
      title={type === 1 ? t('Invite friends') : t('Special Invitation')}
      creactOnUse
      visible={visible}
      setVisible={setVisible}
    >
      <Flex maxWidth='410px' flexDirection='column'>
        <Content>
          {type === 1 ? (
            <>
              <Text mb='20px'> {t('InviteTips1')}</Text>
              <Text> {t('InviteTips2')}</Text>
            </>
          ) : (
            <Text mb='20px'>{t('SpecialInviteTips1')}</Text>
          )}
        </Content>
        {type === 2 && (
          <Text mb='20px' color='textOrigin' small>
            {t('SpecialInviteTips2')}
          </Text>
        )}
        <Button margin='0 auto' width='50%' onClick={onCopyLink}>
          {t('Copy Link')}
        </Button>
      </Flex>
    </ModalWrapper>
  );
});

export default InviteModal;
