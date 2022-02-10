import React, { useState } from 'react';
import { ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, LinkExternal, Input } from 'uikit';
import styled from 'styled-components';
import default_avatar from 'assets/images/default_avatar.jpg';

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

const nftType = {
  MASTER: 'master',
  MEMBER: 'member',
} as const;
type NFTType = typeof nftType[keyof typeof nftType];

export const CommonClaimNFT: React.FC<{ type: NFTType }> = React.memo(
  ({ type = 'MASTER' }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Flex flexWrap='wrap' alignItems='center'>
          <NFTBox mr='80px' mb='20px'>
            <img className='nft-img' src={default_avatar} alt='' />
          </NFTBox>
          <Flex flex='auto' flexDirection='column'>
            <Text fontSize='18px' bold>
              {t('Claim Tribe Lord NFT')}
            </Text>
            <Text mt='20px' color='textTips' small>
              {t(
                'Only by claiming the tribal host NFT can enjoy the tribal host rights.',
              )}
            </Text>
            <Text mt='20px' color='textTips' small>
              {t('Brithday:')} 2022-01-12
            </Text>
            <Flex>
              <Text color='textTips' small>
                {t('Created by:')}
              </Text>
              <Text ml='10px' small>
                马斯克
              </Text>
            </Flex>
            <Flex
              flexWrap='wrap'
              justifyContent='space-between'
              alignItems='flex-end'
            >
              <LinkExternal
                mt='20px'
                color='textPrimary'
                height='24px'
                fontSize='16px'
                href='#'
              >
                View on BSCscan
              </LinkExternal>
              <Flex>
                <Button mr='20px'>{t('取消质押')}</Button>
                <Button onClick={() => setVisible(true)}>
                  {t('Transfer')}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

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
      </>
    );
  },
);
