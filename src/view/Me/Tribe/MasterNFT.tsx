import React, { useState } from 'react';
import { Crumbs, ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, Input } from 'uikit';
import styled from 'styled-components';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';

const InputStyled = styled(Input)`
  width: 100%;
  border-radius: 10px;
  padding: 4px 20px;
`;
const MeTribeMasterNFT = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  return (
    <Box>
      <Crumbs title={t('Master NFT')}>
        <Button onClick={() => setVisible(true)}>{t('Transfer')}</Button>
      </Crumbs>
      <ContentBox>
        <CommonClaimNFT type='master' />
      </ContentBox>

      <ModalWrapper
        creactOnUse
        fillBody
        title={t('Transfer the Tribe Host NFT')}
        visible={visible}
        setVisible={setVisible}
      >
        <Flex flexDirection='column' padding='0 20px'>
          <Text mb='10px' small>
            {t('Transfer to')}
          </Text>
          <InputStyled
            scale='lg'
            placeholder={t('Please enter wallet address')}
          />
          <Text mt='10px' small>
            {t(
              '*Whoever gets the Tribe Host NFT will become the tribe host and has the tribe host rights.',
            )}
          </Text>
          <Flex justifyContent='center'>
            <Button width='125px' mt='20px'>
              {t('confirm')}
            </Button>
          </Flex>
        </Flex>
      </ModalWrapper>
    </Box>
  );
};

export default MeTribeMasterNFT;
