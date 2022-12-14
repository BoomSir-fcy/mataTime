import React, { useMemo } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useTranslation } from 'contexts/Localization';
import { Box, Flex, Image, Text, RefreshRingIcon, BalanceText } from 'uikit';
import QuestionHelper from '../QuestionHelper';

const CoinItemStyled = styled(Flex)<{
  fillClickArea?: boolean;
  isActive?: boolean;
}>`
  width: 100%;
  height: 75px;
  cursor: ${({ fillClickArea, isActive }) =>
    isActive ? 'default' : fillClickArea ? 'pointer' : 'auto'};
  opacity: ${({ isActive }) => (isActive ? '0.5' : '1')};
`;
const StyledTriangle = styled.span`
  border: 6px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.white_black};
  position: relative;
  top: 3px;
`;

const PriceBox = styled(Box)`
  max-width: 37%;
  position: relative;
`;

const Helper = styled(QuestionHelper)`
  position: absolute;
  top: 0;
  width: 100%;
`;

interface CoinItemProps {
  fillClickArea?: boolean;
  showHelp?: boolean;
  isActive?: boolean;
  onClick?: (coinInfo: Api.Coins.CoinInfo) => void;
  onTouch?: (coinInfo: Api.Coins.CoinInfo) => void;
  onRefresh?: (coinInfo: Api.Coins.CoinInfo) => void;
  coinInfo: Api.Coins.CoinInfo;
}

const CoinItem: React.FC<CoinItemProps> = ({
  fillClickArea,
  showHelp,
  coinInfo,
  isActive,
  onClick,
  onTouch,
  onRefresh,
}) => {
  const { t } = useTranslation();

  const toggling = (
    event: React.MouseEvent<HTMLDivElement | HTMLOrSVGElement>,
  ) => {
    event.stopPropagation();
  };

  const [currentPrice, decimals] = useMemo(() => {
    // 获取价格及小数位数显示
    if (!Number(coinInfo?.current_price)) return [0, 0];
    return [
      Number(coinInfo?.current_price),
      Number(coinInfo?.current_price?.split('.')[1]?.length) || 0,
    ];
  }, [coinInfo?.current_price]);

  return (
    <CoinItemStyled
      isActive={isActive}
      fillClickArea={fillClickArea}
      onClick={event => {
        toggling(event);
        if (isActive) return;
        onClick && onClick(coinInfo);
      }}
    >
      <Flex width='100%' alignItems='center' justifyContent='space-between'>
        <Flex
          onClick={subEvent => {
            if (onTouch) {
              toggling(subEvent);
              onTouch && onTouch(coinInfo);
            }
          }}
          style={{ cursor: isActive ? 'default' : 'pointer' }}
          alignItems='center'
        >
          <Box width='40px'>
            <Image width={40} height={40} src={coinInfo?.coin_image_url} />
          </Box>
          <Box ml='8px'>
            <Flex pr='8px' alignItems='center' justifyContent='flex-start'>
              <Text fontWeight='bold' color='white_black' fontSize='18px'>
                {coinInfo?.coin_symbol}
              </Text>
              {showHelp && (
                <QuestionHelper
                  text={
                    <>
                      <Text fontSize='14px'>
                        {t('Update time:')}{' '}
                        {dayjs(Number(coinInfo?.add_time) * 1000).format(
                          'YYYY-MM-DD HH:mm',
                        )}
                      </Text>
                      <Text fontSize='14px'>{t('Powered by CoinGecko')}</Text>
                    </>
                  }
                  ml='4px'
                  mr='8px'
                  onClick={toggling}
                  placement='top-start'
                  style={{ cursor: 'auto' }}
                />
              )}
              {onTouch && <StyledTriangle />}
            </Flex>
            <Text ellipsis width='120px' color='textTips' fontSize='14px'>
              {coinInfo?.coin_name}
            </Text>
          </Box>
        </Flex>
        {!!Number(coinInfo?.current_price) && (
          <PriceBox maxWidth='37%'>
            {!!currentPrice ? (
              <>
                <BalanceText
                  ellipsis
                  textAlign='right'
                  prefix='$ '
                  fontWeight='bold'
                  color='text'
                  value={currentPrice}
                  decimals={decimals}
                />
                <Helper
                  text={
                    <BalanceText
                      ellipsis
                      textAlign='right'
                      prefix='$ '
                      fontWeight='bold'
                      color='white_black'
                      value={currentPrice}
                      decimals={decimals}
                    />
                  }
                  iconWidth='90px'
                  iconHeight='20px'
                  onClick={toggling}
                  placement='top-end'
                  style={{ cursor: 'auto' }}
                  color='transparent'
                />
              </>
            ) : (
              <Text
                fontWeight='bold'
                color='text'
                fontSize='18px'
                textAlign='right'
              >
                --
              </Text>
            )}
            <Flex>
              {Number(coinInfo?.price_change_percentage_24h) >= 0 ? (
                <Text color='upPrice' fontSize='14px' textAlign='right'>
                  +{coinInfo?.price_change_percentage_24h}%
                </Text>
              ) : (
                <Text color='downPrice' fontSize='14px' textAlign='right'>
                  {coinInfo?.price_change_percentage_24h}%
                </Text>
              )}
              {onRefresh && (
                <RefreshRingIcon
                  onClick={subEvent => {
                    toggling(subEvent);
                    onRefresh(coinInfo);
                  }}
                  style={{ cursor: 'pointer' }}
                  ml='4px'
                  color='primary'
                  width='16px'
                />
              )}
            </Flex>
          </PriceBox>
        )}
      </Flex>
    </CoinItemStyled>
  );
};

export default CoinItem;
