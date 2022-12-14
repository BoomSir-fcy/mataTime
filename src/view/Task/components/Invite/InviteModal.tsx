import React from 'react';
import { ModalWrapper } from 'components';
import { Flex, Text, Button, Box } from 'uikit';
import styled from 'styled-components';
import Dots from 'components/Loader/Dots';

const Content = styled(Box)`
  padding: 15px 20px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 10px;
`;

const CountBox = styled(Box)`
  width: 88vw;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 410px;
  }
`;
const InviteModal: React.FC<{
  loading?: boolean;
  type?: number;
  visible?: boolean;
  setVisible?: () => void;
  t?: (key: string) => string;
  onCopyLink?: () => void;
}> = React.memo(({ type, loading, visible, setVisible, t, onCopyLink }) => {
  return (
    <ModalWrapper
      overflow='visible'
      title={type === 1 ? t('Invite friends') : t('Special Invitation')}
      creactOnUse
      visible={visible}
      setVisible={setVisible}
    >
      <CountBox>
        <Flex flexDirection='column'>
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
            {loading ? <Dots>{t('Copy Link')}</Dots> : t('Copy Link')}
          </Button>
        </Flex>
      </CountBox>
    </ModalWrapper>
  );
});

export default InviteModal;
