import React, { useEffect, useMemo, useState } from 'react';
import { ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, LinkExternal, Input } from 'uikit';
import styled from 'styled-components';
import default_avatar from 'assets/images/default_avatar.jpg';
import { useDispatch } from 'react-redux';
import { fetchTribeNftInfo } from 'store/tribe';
import { useStore } from 'store';
import { BASE_IMAGE_URL } from 'config';
import { getBscScanLink } from 'utils/contract';
import { getTribeAddress } from 'utils/addressHelpers';

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
const StyledImg = styled.img`
  width: 200px;
  height: 200px;
`;

const nftType = {
  MASTER: 'master',
  MEMBER: 'member',
} as const;
type NFTType = typeof nftType[keyof typeof nftType];

export const CommonClaimNFT: React.FC<{ type: NFTType; tribeId: number }> =
  React.memo(({ type, tribeId }) => {
    const { t } = useTranslation();
    const tribeAddress = getTribeAddress();
    const [visible, setVisible] = useState(false);
    const tribesNftInfo = useStore(p => p.tribe.tribesNftInfo);

    const nftInfo = useMemo(() => {
      if (type === nftType.MASTER) {
        return {
          name: tribesNftInfo.ownerNFTName,
          image: `${BASE_IMAGE_URL}${tribesNftInfo.ownerNFTImage}`,
          introduction: tribesNftInfo.ownerNFTIntroduction,
        };
      }
      if (type === nftType.MEMBER) {
        return {
          name: tribesNftInfo.memberNFTName,
          image: `${BASE_IMAGE_URL}${tribesNftInfo.memberNFTImage}`,
          introduction: tribesNftInfo.memberNFTIntroduction,
        };
      }
    }, [type, tribesNftInfo]);
    return (
      <>
        <Flex flexWrap='wrap' alignItems='center'>
          <NFTBox mr='80px' mb='20px'>
            <StyledImg className='nft-img' src={nftInfo.image} alt='' />
          </NFTBox>
          <Flex maxWidth='60%' flex='auto' flexDirection='column'>
            <Text fontSize='18px' bold>
              {t(`${nftInfo.name}`)}
            </Text>
            <Text mt='20px' color='textTips' small>
              {t(`${nftInfo.introduction}`)}
            </Text>
            {/* <Text mt='20px' color='textTips' small>
              {t('Brithday:')} 2022-01-12
            </Text>
            <Flex>
              <Text color='textTips' small>
                {t('Created by:')}
              </Text>
              <Text ml='10px' small>
                马斯克
              </Text>
            </Flex> */}
            <LinkExternal
              mt='20px'
              color='textPrimary'
              height='24px'
              fontSize='16px'
              href={getBscScanLink(tribeAddress, 'token')}
            >
              View on BSCscan
            </LinkExternal>
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
  });
