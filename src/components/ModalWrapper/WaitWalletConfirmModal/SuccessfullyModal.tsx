import React from 'react';
import { useTranslation } from 'contexts';
import { Box, Flex, Text } from 'uikit';
import { ModalWrapper } from '..';
import { StyledVideo } from './styled';

interface WaitConfirmProps {
  visible: boolean;
  width?: string | number;
  height?: string | number;
  text?: string;
}

export const SuccessfullyModal: React.FC<WaitConfirmProps> = ({
  visible,
  width,
  height,
  text,
}) => {
  return (
    <ModalWrapper
      creactOnUse
      customizeTitle
      shouldCloseOnOverlayClick={false}
      visible={visible}
    >
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <Box width={width} height={height}>
          <StyledVideo
            autoPlay
            muted
            width={width}
            height={height}
            src={require('assets/images/success.mp4').default}
          />
        </Box>
        <Text mt='30px'>{text}</Text>
      </Flex>
    </ModalWrapper>
  );
};

SuccessfullyModal.defaultProps = {
  width: 200,
  height: 200,
};
