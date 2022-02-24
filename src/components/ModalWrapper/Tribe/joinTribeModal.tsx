import React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from 'components';
import { Box, Button, Flex, Text } from 'uikit';

import { useTranslation } from 'contexts/Localization';
import QuestionHelper from 'components/QuestionHelper';

const Container = styled(Box)`
  width: 410px;
  padding-bottom: 20px;
`;

const MaskInfo = styled(Box)`
  background-color: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 18px 13px;
`;

export const JoinTribeModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = React.memo(({ visible, onClose }) => {
  const { t } = useTranslation();
  return (
    <ModalWrapper
      title='Join "Path to Freedom"'
      visible={visible}
      setVisible={onClose}
    >
      <Container>
        <MaskInfo>
          <Flex justifyContent='space-between' alignItems='center' mb='18px'>
            <Flex>
              <Text color='textTips'>Fees to join a basic tribe</Text>
              <QuestionHelper
                ml='15px'
                mt='4px'
                color='white_black'
                text={''}
                placement='auto'
              />
            </Flex>
            <Text fontSize='16px'>5.0 MATTER </Text>
          </Flex>
          <Flex justifyContent='space-between' alignItems='center'>
            <Text color='textTips'>Validity Date</Text>
            <Text fontSize='16px'>Forever </Text>
          </Flex>
        </MaskInfo>
        <Text mt='10px'>* The MATTER will be destroyed</Text>
        <Flex mt='20px' justifyContent='center'>
          <Button>Confirm</Button>
        </Flex>
      </Container>
    </ModalWrapper>
  );
});
