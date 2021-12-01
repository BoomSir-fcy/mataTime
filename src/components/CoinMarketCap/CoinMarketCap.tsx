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
  dark
} from 'uikit';
import ReactLoading from 'react-loading';
import { languagesOptions } from 'config/localization';
import { formatLocalisedCompactNumber } from 'utils/formatBalance';
import { Select } from 'components';
import { useTranslation } from 'contexts/Localization';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import {
  useCoinsList,
  useCoinsState,
  useFetchCoinInfo,
  useFetchCoinsList
} from 'store/coins/hooks';
import CoinItem from './CoinItem';
import { DropDown } from '../DropDown';

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
  const [currentCoin, setCurrentCoin] = useState(coinsList[0]);
  useFetchCoinInfo(currentCoin?.coin_id);

  useEffect(() => {
    if (coinsList.length && !currentCoin) {
      setCurrentCoin(coinsList[0]);
    }
  }, [currentCoin, coinsList]);

  const marketCap = useMemo(() => {
    const value = new BigNumber(currentCoin?.circulating_supply).times(
      currentCoin?.current_price
    );
    if (value.isFinite()) {
      return value.toNumber();
    }
    return 0;
  }, [currentCoin]);

  const totalSupplyValue = useMemo(() => {
    if (!marketCap) return '--';
    return `$ ${formatLocalisedCompactNumber(marketCap)}`;
  }, [marketCap]);

  const dispalyTotalVolume = useMemo(() => {
    if (!Number(currentCoin?.total_volume)) return '--';
    return `$ ${formatLocalisedCompactNumber(
      Number(currentCoin?.total_volume)
    )}`;
  }, [currentCoin?.total_volume]);

  return (
    <StyledPage isBoxShadow isRadius {...props}>
      {!loaded ? (
        <Flex height="100%" justifyContent="center" alignItems="center">
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
          <StyledPageItem pt="8px">
            <CoinItem
              showHelp
              onTouch={() => setIsOpen(!isOpen)}
              coinInfo={currentCoin}
            />
          </StyledPageItem>
          <Box>
            <DropDown fillWidth isOpen={isOpen} setIsOpen={setIsOpen}>
              <StyledPageItem>
                {coinsList.map(item => (
                  <CoinItem
                    key={item.coin_id}
                    fillClickArea
                    isActive={item.coin_id === currentCoin?.coin_id}
                    onClick={coin => {
                      setIsOpen(!isOpen);
                      setCurrentCoin(coin);
                    }}
                    coinInfo={item}
                  />
                ))}
              </StyledPageItem>
            </DropDown>
          </Box>
          <StyledPageItem>
            {!!Number(currentCoin?.current_price) ? (
              <Flex mt="8px" justifyContent="space-between">
                <Box>
                  <Text fontSize="14px" color="textgrey">
                    {t('MARKET CAP')}
                  </Text>
                  <Text bold color="textPrimary" fontSize="14px">
                    {totalSupplyValue}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="14px" color="textgrey" textAlign="right">
                    {t('VOLUME')}
                  </Text>
                  <Text
                    bold
                    color="textPrimary"
                    fontSize="14px"
                    textAlign="right"
                  >
                    {dispalyTotalVolume}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Text
                fontSize="14px"
                textAlign="center"
                mt="16px"
                color="textgrey"
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
