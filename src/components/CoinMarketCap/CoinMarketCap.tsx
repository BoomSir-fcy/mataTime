import React, { useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import {
  Card,
  BoxProps,
  Flex,
  Box,
  Text,
  BalanceText,
  light,
  dark,
} from 'uikit';
import ReactLoading from 'react-loading';
import { languagesOptions } from 'config/localization';
import {
  formatLocalisedCompactNumber,
  getBalanceNumber,
} from 'utils/formatBalance';
import { useStore } from 'store';
import { Select } from 'components';
import { useTranslation } from 'contexts/Localization';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import {
  useCoinsList,
  useCoinsState,
  useFetchCoinInfo,
  useFetchCoinsList,
} from 'store/coins/hooks';
import CoinItem from './CoinItem';
import { DropDown } from '../DropDown';
import { getTimeAddress, getMatterAddress } from 'utils/addressHelpers';
import { useDsgTotalSupply, useTotalSupply } from 'hooks/useTokenBalance';
import { useTimeShopBalance } from 'hooks/useTimeShopBalance';

const StyledPage = styled(Card)`
  width: 300px;
  height: 150px;
  /* padding: 16px; */
  /* box-shadow: 0px 0px 8px 4px rgba(65, 104, 237); */
  overflow: visible;
`;

const StyledPageItem = styled(Box)`
  margin: 0 16px;
`;

export const CoinMarketCap: React.FC<BoxProps> = ({ ...props }) => {
  const [languange, setUseLanguage] = useLanguange();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isDark] = useThemeManager();

  useFetchCoinsList();
  const { loaded } = useCoinsState();
  const coinsList = useCoinsList();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCoin = useMemo(() => {
    return coinsList[currentIndex];
  }, [currentIndex, coinsList]);
  // const [currentCoin, setCurrentCoin] = useState(coinsList[0]);
  useFetchCoinInfo(currentCoin?.coin_id);

  const coins = useStore(p => p.coins.clickCoins);
  const [coinSymbol, setCoinSymbol] = useState('');
  const timeAddress = getTimeAddress();
  const MatterAddress = getMatterAddress();

  // 获取time Matter 的 totalSupply
  const timeSupply = useTotalSupply(timeAddress);
  const matterSupply = useTotalSupply(MatterAddress);
  const dsgSupply = useDsgTotalSupply();
  const timeShopBalance = useTimeShopBalance();

  useEffect(() => {
    if (coins?.symbol) {
      setCoinSymbol(coins?.symbol);
    }
  }, [coins]);

  useEffect(() => {
    if (coinSymbol) {
      let activeIndex = 0;
      const activeCoin = coinsList.find((item, index) => {
        if (item.coin_symbol === coinSymbol) {
          activeIndex = index;
          return true;
        }
        return false;
      });
      if (activeCoin) {
        // setCurrentCoin(activeCoin);
        setCurrentIndex(activeIndex);
        setCoinSymbol('');
      }
    }
  }, [coinSymbol, coinsList]);

  useEffect(() => {
    if (coinsList.length && !currentCoin) {
      // setCurrentCoin(coinsList[0]);
      setCurrentIndex(0);
    }
  }, [currentCoin, coinsList]);

  const marketCap = useMemo(() => {
    let value;
    let supply;
    const { coin_symbol } = currentCoin || {};
    if (coin_symbol === 'MATTER') {
      supply = getBalanceNumber(matterSupply);
    } else if (coin_symbol === 'TIME') {
      supply = getBalanceNumber(timeSupply?.minus(timeShopBalance));
    } else if (coin_symbol === 'DSG') {
      supply = getBalanceNumber(dsgSupply);
    } else {
      supply = currentCoin?.circulating_supply;
    }
    value = new BigNumber(supply).times(currentCoin?.current_price);
    if (value.isFinite()) {
      return value.toNumber();
    }
    return 0;
  }, [currentCoin, matterSupply, timeSupply, dsgSupply]);

  const totalSupplyValue = useMemo(() => {
    if (!marketCap) return '--';
    return `$ ${formatLocalisedCompactNumber(marketCap)}`;
  }, [marketCap]);

  const dispalyTotalVolume = useMemo(() => {
    if (!Number(currentCoin?.total_volume)) return '--';
    return `$ ${formatLocalisedCompactNumber(
      Number(currentCoin?.total_volume),
    )}`;
  }, [currentCoin?.total_volume, coinsList]);

  return (
    <StyledPage {...props}>
      {!loaded ? (
        <Flex height='100%' justifyContent='center' alignItems='center'>
          <ReactLoading
            type={'cylon'}
            color={
              isDark
                ? light.colors.backgroundLight
                : light.colors.backgroundPrimary
            }
          />
        </Flex>
      ) : (
        <>
          <StyledPageItem pt='8px'>
            <CoinItem
              showHelp
              onTouch={() => setIsOpen(!isOpen)}
              coinInfo={currentCoin}
            />
          </StyledPageItem>
          <Box>
            <DropDown fillWidth isOpen={isOpen} setIsOpen={setIsOpen}>
              <Box
                style={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
                maxHeight='300px'
              >
                <StyledPageItem>
                  {coinsList.map((item, index) => (
                    <CoinItem
                      key={item.coin_id}
                      fillClickArea
                      isActive={item.coin_id === currentCoin?.coin_id}
                      onClick={coin => {
                        setIsOpen(!isOpen);
                        setCurrentIndex(index);
                        // setCurrentCoin(coin);
                      }}
                      coinInfo={item}
                    />
                  ))}
                </StyledPageItem>
              </Box>
            </DropDown>
          </Box>
          <StyledPageItem>
            {!!Number(currentCoin?.current_price) ? (
              <Flex mt='8px' justifyContent='space-between'>
                <Box>
                  <Text fontSize='14px' color='textTips'>
                    {t('MARKET CAP')}
                  </Text>
                  <Text
                    fontWeight='bold'
                    color={isDark ? 'primary' : 'ThemeText'}
                    fontSize='14px'
                  >
                    {totalSupplyValue}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='14px' color='textTips' textAlign='right'>
                    {t('VOLUME')}
                  </Text>
                  <Text
                    fontWeight='bold'
                    color={isDark ? 'primary' : 'ThemeText'}
                    fontSize='14px'
                    textAlign='right'
                  >
                    {dispalyTotalVolume}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Text
                fontSize='14px'
                textAlign='center'
                mt='16px'
                color='textgrey'
              >
                {t('commonCoinMarketEmpty')}
              </Text>
            )}
          </StyledPageItem>
        </>
      )}
    </StyledPage>
  );
};
