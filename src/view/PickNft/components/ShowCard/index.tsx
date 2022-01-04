import React, { useMemo, useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChromePicker } from 'react-color';
import { Heading, Text, Card, Box, Image, Flex, Button, light } from 'uikit';
import styled from 'styled-components';
import Dots from 'components/Loader/Dots';
import { orderBy } from 'lodash';
import { useToast } from 'hooks';
import useTheme from 'hooks/useTheme';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { useFetchNftApproval } from 'store/picknft/hooks';
import Container from 'components/Layout/Container';
import { randomPick } from 'store/picknft/actions';
import { ExChangeResult, useExchangePhoto } from 'view/PickNft/hooks/exchange';
import { useNftApproveExPhoto } from 'view/PickNft/hooks/useApprove';
import { fetchNftApprovalAsync, fetchStuffAllLimitsAsync } from 'store/picknft';
// import { fetchNftUserDataAsync } from 'store/nfts'
import { formatHexadecimal } from 'utils/formatNumber';
import { ConnectWalletButton } from 'components';
import { NftInfo } from 'store/types';
import { useStore } from 'store';

interface ColorRgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

const PageContainer = styled(Container)`
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    position: sticky;
    top: 84px;
  }
`;

const BoxPaddingStyled = styled(Box)`
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-top: 4px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    padding-top: 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 8px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 16px;
  }
`;

const BoxStyled = styled(Box)<{ rgba: ColorRgba }>`
  /* max-width: 300px;
  max-height: 300px;
  min-width: 160px;
  min-height: 160px;
  width: 16vw;
  height: 16vw; */
  width: 24vh;
  height: 24vh;
  max-width: 100%;
  max-height: 100%;
  min-width: 130px;
  min-height: 130px;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 300px;
    max-height: 300px;
    min-width: 180px;
    min-height: 180px;
    width: 20vw;
    height: 20vw;
  }
  background: ${({ rgba }) =>
    `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`};
  position: relative;
  margin: auto;
`;
const CardStyled = styled(Card)`
  padding: 16px;
  overflow: visible;
`;

const ImageStyled = styled(Image)<{ zIndex?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex};
`;

const PickerBox = styled(Box)`
  position: relative;
`;

const ShowColorPicker = styled(Box)<{ rgba: ColorRgba }>`
  width: 75px;
  height: 35px;
  background: ${({ rgba }) =>
    `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`};
  border-radius: ${({ theme }) => theme.radii.card};
  cursor: pointer;
`;

const ColorPicker = styled(Box)`
  position: absolute;
  top: 50px;
  z-index: 200;
`;
const Cover = styled(Box)`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

interface AvatarShowCard {
  avatarNft: NftInfo[];
  balance: number;
}

const ShowCard: React.FC<AvatarShowCard> = ({ avatarNft, balance }) => {
  useFetchNftApproval();

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorRgba, setColorRgba] = useState<ColorRgba>({
    r: 246,
    g: 255,
    b: 240,
    a: 1,
  });
  const [colorHex, colorAlpha] = useMemo(() => {
    return [
      `${formatHexadecimal(colorRgba.r)}${formatHexadecimal(
        colorRgba.g,
      )}${formatHexadecimal(colorRgba.b)}`,
      formatHexadecimal(colorRgba.a * 0xff),
    ];
  }, [colorRgba]);

  const { theme } = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { toastSuccess, toastError } = useToast();
  const { selectData, isApprove } = useStore(p => p.pickNft);
  const dispatch = useDispatch();
  const { onExchange } = useExchangePhoto();
  const { onApprove } = useNftApproveExPhoto();
  const randomPickHandle = useCallback(
    () => dispatch(randomPick()),
    [dispatch],
  );
  const [pendingTx, setPendingTx] = useState(false);

  const onMintHandle = useCallback(async () => {
    const sortData = orderBy(selectData, stuff => stuff.index, 'asc');
    const res = await onExchange(
      sortData.map(item => item.id),
      avatarNft[0]?.properties?.token_id,
      `0x${colorHex}${colorAlpha}`,
    );
    // dispatch(fetchNftUserDataAsync(account))
    dispatch(fetchStuffAllLimitsAsync());
    return res;
  }, [
    selectData,
    dispatch,
    onExchange,
    account,
    colorHex,
    colorAlpha,
    avatarNft,
  ]);

  const handleColorChange = useCallback(color => {
    setColorRgba(color.rgb);
  }, []);

  return (
    <PageContainer>
      <CardStyled>
        <Heading mb='16px' textAlign='center'>
          {t('The Original Dinos')}
        </Heading>
        <BoxStyled rgba={colorRgba}>
          {selectData.map(item => (
            <ImageStyled
              width={300}
              height={300}
              key={item.src}
              zIndex={item.zIndex}
              src={item.images}
            />
          ))}
        </BoxStyled>
        <PickerBox>
          <Flex mt='8px' alignItems='center'>
            <ShowColorPicker
              rgba={colorRgba}
              onClick={() => setDisplayColorPicker(true)}
            />
            <Box ml='8px'>
              <Text fontSize='14px'>{t('Color')}</Text>
              <Text fontSize='14px'>#{colorHex}</Text>
            </Box>
          </Flex>
          {displayColorPicker && (
            <ColorPicker>
              <Cover onClick={() => setDisplayColorPicker(false)} />
              <ChromePicker
                disableAlpha
                color={colorRgba}
                onChange={handleColorChange}
              />
            </ColorPicker>
          )}
        </PickerBox>
      </CardStyled>
      <Text
        maxWidth='100%'
        fontSize='14px'
        textAlign='center'
        mt='8px'
        color='textPrimary'
      >
        {/* {t('Combine your mini-dragons with a rarity of %rate%', { rate: '21%'})} */}
        {t('Create you own personalized avatars!')}
      </Text>
      <BoxPaddingStyled>
        <Flex justifyContent='space-between'>
          <Button onClick={randomPickHandle} variant='secondary' scale='ld'>
            {t('Random')}
          </Button>
          {!account ? (
            <ConnectWalletButton />
          ) : isApprove ? (
            <Button
              disabled={pendingTx || !avatarNft?.length}
              onClick={async () => {
                setPendingTx(true);
                try {
                  const status = await onMintHandle();
                  if (status === ExChangeResult.SUCCESS) {
                    toastSuccess(
                      t('Successfully Mint!'),
                      t('You can view this Avatar in the bag'),
                    );
                  } else if (status === ExChangeResult.AVATAR_EXISTS) {
                    toastError(
                      t('Error'),
                      t(
                        'Sorry, this Avatar is existent, please replace the parts and try again',
                      ),
                    );
                  } else {
                    toastError(
                      t('Error'),
                      t(
                        'Sorry, this Avatar has not a part left, please replace the parts and try again',
                      ),
                    );
                  }
                } catch (e) {
                  toastError(
                    t('Error'),
                    t(
                      'Please try again. Confirm the transaction and make sure you are paying enough gas!',
                    ),
                  );
                  console.error(e);
                } finally {
                  setPendingTx(false);
                }
              }}
              scale='ld'
            >
              {pendingTx ? <Dots>{t('Minting')}</Dots> : t('Mint')}
            </Button>
          ) : (
            <Button
              disabled={pendingTx || !avatarNft?.length}
              onClick={async () => {
                setPendingTx(true);
                try {
                  setPendingTx(true);
                  const status = await onApprove();
                  if (status) {
                    dispatch(fetchNftApprovalAsync());
                  }
                } finally {
                  setPendingTx(false);
                }
              }}
              scale='ld'
            >
              {pendingTx ? (
                <Dots>{t('Enabling %asset%', { asset: 'NFT' })}</Dots>
              ) : (
                t('Enable %asset%', { asset: 'NFT' })
              )}
            </Button>
          )}
        </Flex>
      </BoxPaddingStyled>
      <BoxPaddingStyled>
        <Card padding='8px 24px'>
          <Flex alignItems='center'>
            <Text fontSize='14px'>{t('Currently holding Drawing boards')}</Text>
            <Text bold ml='8px' color='textPrimary'>
              {avatarNft?.length}
            </Text>
          </Flex>
          <Flex alignItems='center' mt='8px'>
            <Text fontSize='14px'>{t('Currently holding an Avatar NFT')}</Text>
            <Text bold ml='8px' color='textPrimary'>
              {balance}
            </Text>
          </Flex>
        </Card>
      </BoxPaddingStyled>
    </PageContainer>
  );
};

export default ShowCard;
