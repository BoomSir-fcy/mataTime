import { useTranslation } from 'contexts';
import React from 'react';
import { Box, Flex, Text } from 'uikit';
import darkTheme from 'uikit/theme/dark';
import { ModalWrapper } from '..';
import { StyledVideo } from './styled';

interface WaitConfirmProps {
  visible: boolean;
  width?: string | number;
  height?: string | number;
}

export const WaitConfirmModal: React.FC<WaitConfirmProps> = ({
  visible,
  width,
  height,
}) => {
  const { t } = useTranslation();

  return (
    <ModalWrapper
      creactOnUse
      customizeTitle
      shouldCloseOnOverlayClick={false}
      visible={visible}
      theme={darkTheme}
    >
      <Flex
        theme={darkTheme}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Box width={width} height={height}>
          <StyledVideo
            autoPlay
            muted
            loop
            width={width}
            height={height}
            src={require('assets/images/waiting.mp4').default}
          />
        </Box>
        <Text theme={darkTheme} mt='30px' style={{ lineHeight: 'inherit' }}>
          {t('Waiting For Confirmation')}
        </Text>
        <Text theme={darkTheme} mt='10px' small color='textTips'>
          {t('To cancel this transaction, please reject it in your wallet')}
        </Text>
      </Flex>
    </ModalWrapper>
  );
};

WaitConfirmModal.defaultProps = {
  width: 200,
  height: 200,
};
