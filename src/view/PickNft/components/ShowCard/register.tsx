import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChromePicker } from 'react-color';
import { Heading, Text, Card, Box, Image, Flex, Button, light, Spinner } from 'uikit';
import styled from 'styled-components';
import Dots from 'components/Loader/Dots';
import { orderBy } from 'lodash';
import { useToast } from 'hooks';
import useTheme from 'hooks/useTheme';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { useFetchNftApproval, usePickNftState } from 'store/picknft/hooks';
import Container from 'components/Layout/Container';
import { randomPick } from 'store/picknft/actions';
import { ExChangeResult, useExchangePhoto, useLockInviteCode } from 'view/PickNft/hooks/exchange';
import { useNftApproveExPhoto } from 'view/PickNft/hooks/useApprove';
import { fetchCodeInfoAsync, fetchNftApprovalAsync, fetchStuffAllLimitsAsync } from 'store/picknft';
// import { fetchNftUserDataAsync } from 'store/nfts'
import { formatHexadecimal } from 'utils/formatNumber';
import { ConnectWalletButton, Icon, ModalWrapper } from 'components';
import { NftInfo } from 'store/types';
import { useStore } from 'store';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import LockModal from '../pop/lock';
import StateModal from '../pop/state';
import { useCountdownTime } from 'view/PickNft/hooks/DownTime';
import SetNickName from './setName';
import { fetchCodeInfo } from 'store/picknft/fetchUserAllowance';

dayjs.extend(duration);
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
  padding-top: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 30px;
  }
`;

const BoxPaddingStyled = styled(Box)`
  padding-top: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 16px;
  }
`;

const BoxStyled = styled(Box) <{ rgba: ColorRgba }>`
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
  border-radius: 20px;
`;

const ImageStyled = styled(Image) <{ zIndex?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex};
`;

const PickerBox = styled(Box)`
  position: relative;
`;

const ShowColorPicker = styled(Box) <{ rgba: ColorRgba }>`
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

const RegisterShowCard: React.FC = () => {
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
  const dispatch = useDispatch();
  const { onExchange } = useExchangePhoto();
  const { onApprove } = useNftApproveExPhoto();
  // const [LeftTime, setLeftTime] = useState(0);
  const { codes, selectData, codeInfo, inviteInfo, inviteLoading } = usePickNftState()

  const { onLockCode } = useLockInviteCode();


  const LeftTime = useMemo(() => {
    if (inviteInfo.codeLockDuration_ && codeInfo.lockedAt) {
      return inviteInfo.codeLockDuration_ + codeInfo.lockedAt
    }
    return 0
  }, [inviteInfo.codeLockDuration_, codeInfo.lockedAt])

  const [DownTime, hour, minute, second] = useCountdownTime(LeftTime);
  const [visible, setVisible] = useState(true);
  const randomPickHandle = useCallback(
    () => dispatch(randomPick()),
    [dispatch],
  );

  useEffect(() => {
    if (!(hour >= 0 && minute >= 0 && second >= 0)) {
      setVisible(true)
    }
  }, [hour, minute, second])

  const codeState = useMemo(() => {
    // if (codeInfo.state === '2') return 
    return codeInfo.state
  }, [codeInfo])

  const onMintHandle = useCallback(async (value) => {
    const sortData = orderBy(selectData, stuff => stuff.index, 'asc');
    const res = await onExchange(
      sortData.map(item => item.id),
      value,
      codes.code,
      `0x${colorHex}${colorAlpha}`,
    );
    dispatch(fetchStuffAllLimitsAsync());
    return res;
  }, [selectData, dispatch, onExchange, codes.code, account, colorHex, colorAlpha]);

  const handleColorChange = useCallback(color => {
    setColorRgba(color.rgb);
  }, []);

  const handLock = useCallback(async (val) => {
    await onLockCode(val);
    dispatch(fetchCodeInfoAsync(codes))
    setVisible(false);
  }, [onLockCode]);

  const onClose = useCallback(() => {
    setVisible(false);
    // dispatch(fetchCodeInfoAsync(codes))
  }, [setVisible, dispatch, codes]);

  return (
    <PageContainer>
      <Flex justifyContent='end'>
        <Flex
          width='50%'
          maxWidth='150px'
          alignItems='baseline'
          justifyContent='space-between'
          mb='20px'
        >
          <Text fontSize='14px'>{t('locking')}</Text>
          <Text bold color={minute < 2 ? 'failure' : 'text'}>{DownTime}</Text>
          <Icon
            size={23}
            current={1}
            name='icon-suo'
            onClick={() => setVisible(true)}
          />
        </Flex>
      </Flex>
      <CardStyled>
        <Heading mb='16px' textAlign='center'>
          {t('Bored Ape')}
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
          <Flex alignItems='center' justifyContent='space-between'>
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
            <Button mt='8px' onClick={randomPickHandle}>
              {t('Random')}
            </Button>
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
      <BoxPaddingStyled>
        <SetNickName onComplete={onMintHandle} />
        {/* <Flex>
          {!account ? <ConnectWalletButton /> : }
        </Flex> */}
      </BoxPaddingStyled>
      {/* 输入框弹窗 */}
      <ModalWrapper
        title={t('Lock NFT')}
        visible={visible}
        setVisible={() => setVisible(codeInfo.state !== 1)}
        customizeTitle={codeInfo.state !== 1}
      >
        {
          inviteLoading
            ?
            <Spinner />
            :
            <>
              {
                codeInfo.state !== 1
                  ?
                  <StateModal onClose={onClose} state={codeInfo.state} />
                  :
                  <LockModal onLock={handLock} InviteCode={codes.lock_hash} />
              }
            </>
        }
      </ModalWrapper>
    </PageContainer>
  );
};

export default RegisterShowCard;
