import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChromePicker } from 'react-color';
import {
  Heading,
  Text,
  Card,
  Box,
  Image,
  Flex,
  Button,
  light,
  Spinner,
  Skeleton,
} from 'uikit';
import { useStore, storeAction } from 'store';
import styled from 'styled-components';
import Dots from 'components/Loader/Dots';
import { orderBy } from 'lodash';
import { useToast } from 'hooks';
import useTheme from 'hooks/useTheme';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import {
  useFetchBuyInfo,
  useFetchNftApproval,
  usePickNftState,
} from 'store/picknft/hooks';
import Container from 'components/Layout/Container';
import { randomPick } from 'store/picknft/actions';
import {
  ExChangeResult,
  useExchangeAndBuyPhoto,
} from 'view/PickNft/hooks/exchange';
import { useNftApproveExPhoto } from 'view/PickNft/hooks/useApprove';
import {
  fetchCodeInfoAsync,
  fetchMetaycInfoAsync,
  fetchNftApprovalAsync,
  fetchStuffAllLimitsAsync,
} from 'store/picknft';
// import { fetchNftUserDataAsync } from 'store/nfts'
import { formatHexadecimal } from 'utils/formatNumber';
import { ConnectWalletButton, Icon, ModalWrapper } from 'components';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import LockModal from '../pop/lock';
import StateModal from '../pop/state';
import { useCountdownTime } from 'view/PickNft/hooks/DownTime';
import SetNickName from './setName';
import { fetchCodeInfo } from 'store/picknft/fetchUserAllowance';
import {
  formatDisplayApr,
  getBalanceNumber,
  getFullDisplayBalance,
} from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { useHistory, useLocation } from 'react-router-dom';
import { useGetBnbBalance } from 'hooks/useTokenBalance';

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

const BoxStyled = styled(Box)<{ rgba: ColorRgba }>`
  width: 24vh;
  height: 24vh;
  max-width: 100%;
  max-height: 100%;
  min-width: 200px;
  min-height: 200px;
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

const Submit = styled(Button)`
  width: 100%;
  text-transform: capitalize;
`;

const BtnBox = styled(Flex)`
  padding: 16px 0;
`;

const CreateShowCard: React.FC = () => {
  // useFetchNftApproval();
  useFetchBuyInfo();
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

  const { replace } = useHistory();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { toastSuccess, toastError, toastWarning } = useToast();
  const dispatch = useDispatch();
  const { onExchange } = useExchangeAndBuyPhoto();
  const { onApprove } = useNftApproveExPhoto();
  const { balance: currencyBalance } = useGetBnbBalance();
  // const [LeftTime, setLeftTime] = useState(0);
  const { codes, selectData, codeInfo, inviteInfo, inviteLoading, buyInfo } =
    usePickNftState();

  const LeftTime = useMemo(() => {
    if (inviteInfo.codeLockDuration_ && codeInfo.lockedAt) {
      return inviteInfo.codeLockDuration_ + codeInfo.lockedAt;
    }
    return 0;
  }, [inviteInfo.codeLockDuration_, codeInfo.lockedAt]);

  const [DownTime, hour, minute, second] = useCountdownTime(LeftTime);
  const [visible, setVisible] = useState(true);
  const randomPickHandle = useCallback(
    () => dispatch(randomPick()),
    [dispatch],
  );

  useEffect(() => {
    if (!(hour >= 0 && minute >= 0 && second >= 0)) {
      setVisible(true);
    }
  }, [hour, minute, second]);

  const codeState = useMemo(() => {
    // if (codeInfo.state === '2') return
    return codeInfo.state;
  }, [codeInfo]);
  const [pending, setpending] = useState(false);

  const onMintHandle = useCallback(async () => {
    try {
      if (currencyBalance.isLessThan(buyInfo.price)) {
        toastWarning(t('rewardAutherTransferAmountExceedsBlanceError'));
        return;
      }
      setpending(true);
      const sortData = orderBy(selectData, stuff => stuff.index, 'asc');
      const status = await onExchange(
        sortData.map(item => item.id),
        `0x${colorHex}${colorAlpha}`,
        buyInfo.price,
      );
      if (status === ExChangeResult.SUCCESS) {
        toastSuccess('Successfully Mint!');
        dispatch(storeAction.changeReset);
        replace('/login');
      } else if (status === ExChangeResult.AVATAR_EXISTS) {
        toastError(
          t(
            'Sorry, this Avatar is existent, please replace the parts and try again',
          ),
        );
      }
      // dispatch(fetchStuffAllLimitsAsync());
      dispatch(fetchMetaycInfoAsync());
    } catch (error) {
      console.error(error);
      const errTip = `${t('Error')}! ${t(
        'Please try again. Confirm the transaction and make sure you are paying enough gas!',
      )}`;
      toastError(errTip);
    } finally {
      setpending(false);
    }
  }, [
    t,
    toastError,
    toastSuccess,
    toastWarning,
    selectData,
    setpending,
    dispatch,
    onExchange,
    replace,
    colorHex,
    colorAlpha,
    currencyBalance,
    buyInfo.price,
  ]);

  const handleColorChange = useCallback(color => {
    setColorRgba(color.rgb);
  }, []);

  const totalAmount = useMemo(() => {
    return getBalanceNumber(new BigNumber(buyInfo.price).times(1));
  }, [buyInfo.price]);

  const remaining = useMemo(() => {
    return buyInfo?.limit - buyInfo?.count || 0;
  }, [buyInfo?.limit, buyInfo?.count]);

  return (
    <PageContainer>
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
          <Flex alignItems='center' justifyContent='flex-end'>
            {/* <Flex mt='8px' alignItems='center'>
              <ShowColorPicker
                rgba={colorRgba}
                onClick={() => setDisplayColorPicker(true)}
              />
              <Box ml='8px'>
                <Text fontSize='14px'>{t('Color')}</Text>
                <Text fontSize='14px'>#{colorHex}</Text>
              </Box>
            </Flex> */}
            <Button mt='8px' onClick={randomPickHandle}>
              {t('Random')}
            </Button>
          </Flex>
          {/* {displayColorPicker && (
            <ColorPicker>
              <Cover onClick={() => setDisplayColorPicker(false)} />
              <ChromePicker
                disableAlpha
                color={colorRgba}
                onChange={handleColorChange}
              />
            </ColorPicker>
          )} */}
        </PickerBox>
      </CardStyled>
      <BoxPaddingStyled>
        <BtnBox justifyContent='center'>
          <Submit
            isLoading={buyInfo.loading}
            scale='ld'
            onClick={onMintHandle}
            disabled={pending || !buyInfo.enableBuy || remaining <= 0}
          >
            {pending ? (
              <Dots>{t('Minting')}</Dots>
            ) : (
              t('Mint METAYC (%price% %symbol%)', {
                price: totalAmount,
                symbol: 'BNB',
              })
            )}
          </Submit>
        </BtnBox>
      </BoxPaddingStyled>
      {!buyInfo.loading ? (
        <Text fontSize='14px' color='orange'>
          {remaining}/{buyInfo.limit} {t('Remaining')}
        </Text>
      ) : (
        <Skeleton width={80} height={18} />
      )}
    </PageContainer>
  );
};

export default CreateShowCard;
