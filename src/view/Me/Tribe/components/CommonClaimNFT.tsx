import React from 'react';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, LinkExternal } from 'uikit';
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

const nftType = {
  MASTER: 'master',
  MEMBER: 'member',
} as const;
type NFTType = typeof nftType[keyof typeof nftType];

export const CommonClaimNFT: React.FC<{ type: NFTType }> = React.memo(
  ({ type = 'MASTER' }) => {
    const { t } = useTranslation();
    return (
      <Flex flexWrap='wrap' alignItems='center'>
        <NFTBox mr='80px' mb='20px'>
          <img className='nft-img' src={default_avatar} alt='' />
        </NFTBox>
        <Flex flexDirection='column'>
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

          {type === nftType.MASTER && <Button mt='40px'>{t('Approve')}</Button>}
          {type === nftType.MEMBER && (
            <>
              <Flex>
                <Text color='textTips' small>
                  {t('Created by:')}
                </Text>
                <Text ml='10px' small>
                  马斯克
                </Text>
              </Flex>
              <LinkExternal
                mt='20px'
                color='textPrimary'
                height='24px'
                fontSize='16px'
                href='#'
              >
                View on BSCscan
              </LinkExternal>
            </>
          )}
        </Flex>
      </Flex>
    );
  },
);
