import React, { useState } from 'react';
import { Avatar, Crumbs, ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, Image, Input } from 'uikit';
import styled from 'styled-components';
import default_avatar from 'assets/images/default_avatar.jpg';

const MasterNFTBox = styled(Box)`
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
const NFTImg = styled(Avatar)`
  border-radius: 10px;
  &.active {
    box-shadow: ${({ theme }) =>
      theme.isDark
        ? `0px 0px 9px 5px ${theme.colors.white}`
        : ` 0px 0px 10px 0px ${theme.colors.backgroundPrimary}`};
  }
`;
const NFTBox = styled(Box)`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  .nft-img {
    width: 200px;
    border-radius: 10px;
    box-shadow: ${({ theme }) =>
      theme.isDark
        ? `0px 0px 10px 0px ${theme.colors.white}`
        : ` 0px 0px 10px 0px ${theme.colors.backgroundPrimary}`};
  }
`;
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
        <Button onClick={() => setVisible(true)}>转让</Button>
      </Crumbs>
      <MasterNFTBox>
        <Flex flexWrap='wrap' alignItems='center'>
          <NFTBox mr='80px' mb='20px'>
            <img className='nft-img' src={default_avatar} alt='' />
          </NFTBox>
          <Flex flexDirection='column'>
            <Text fontSize='18px' bold>
              {t('认领部落主NFT')}
            </Text>
            <Text mt='20px' color='textTips' small>
              {t('只有认领部落宿主NFT才能享受部落宿主权利。')}
            </Text>
            <Text mt='20px' color='textTips' small>
              {t('Brithday:')} 2022-01-12
            </Text>
            <Button mt='40px'>{t('批准')}</Button>
          </Flex>
        </Flex>
      </MasterNFTBox>

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
