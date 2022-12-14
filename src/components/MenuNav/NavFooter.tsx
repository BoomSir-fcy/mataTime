import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import { REFRESH_TIME_BURN_PER_CIRCLE } from 'config';
import { Link } from 'react-router-dom';
import { Circle } from 'rc-progress';
import { Box, Flex, Text, Image } from 'uikit';
import { useTokenBalance } from 'hooks/useTokenBalance';
import { getTimeAddress } from 'utils/addressHelpers';
import { formatDisplayBalanceWithSymbol } from 'utils/formatBalance';
import { usePlatformTimeBalance } from 'store/wallet/hooks';
import { useTranslation } from 'contexts/Localization';
import { ProfileMenu } from './ProfileMenu';
import Shalou from './Shalou';
import useTheme from 'hooks/useTheme';
import { fetchWalletBurncointoday } from 'store/wallet/reducer';
import { useDispatch } from 'react-redux';

export interface NavFooterProps {
  // seconds?: number
}

const User = styled(Flex)`
  display: block;
  margin-top: auto;
  flex: 1;
  flex-grow: inherit;
`;

const TimeInfoBox = styled(Flex)`
  /* width: 100%; */
  height: 110px;
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
  border-radius: 10px;
  padding-left: 12px;
  margin-bottom: 30px;
`;

const strokeWidth = 8;

const DownTimeBox = styled(Box)`
  position: absolute;
  width: ${100 - strokeWidth * 2}%;
  height: ${100 - strokeWidth * 2}%;
  /* background: ${({ theme }) => theme.colors.background}; */
  border-radius: 50%;
  top: ${strokeWidth}%;
  left: ${strokeWidth}%;
`;

const PERCENT_MAX = 100;

const NavFooter: React.FC<NavFooterProps> = ({ }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const dispatch = useDispatch();

  const [percent, setPercent] = useState(0);
  const [temp, setTemp] = useState(0);
  const burnCoinTody = useStore(p => p.wallet.spendTimeInfo.burnCoinTody);
  const { availableBalance } = usePlatformTimeBalance();

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(prep => {
        if (prep >= PERCENT_MAX)
          return PERCENT_MAX / (REFRESH_TIME_BURN_PER_CIRCLE / 1000);
        return prep + PERCENT_MAX / (REFRESH_TIME_BURN_PER_CIRCLE / 1000);
      });
      setTemp(prep => prep + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [percent, temp]);

  return (
    <Box mb='32px' padding='0 8px'>
      <TimeInfoBox flexDirection='column' justifyContent='center'>
        <Flex onClick={() => {
          dispatch(fetchWalletBurncointoday());
        }} style={{
          cursor: 'pointer',
        }} title={t('Refresh ')} alignItems='center'>
          <Box position='relative' width='33px' height='33px'>
            <Circle
              percent={percent}
              strokeWidth={strokeWidth}
              trailWidth={2}
              strokeColor={isDark ? '#FFF' : '#000'}
            />
            <DownTimeBox>
              <Shalou />
            </DownTimeBox>
          </Box>
          <Box ml='16px'>
            <Text color='textTips' fontSize='14px'>
              {t('Today bunrt')}
            </Text>
            <Text color='white_black' fontSize='14px'>
              {burnCoinTody}
            </Text>
          </Box>
        </Flex>
        <Flex mt='8px' alignItems='center'>
          <Box width='33px' height='33px'>
            <Image src='/images/tokens/TIME.svg' width={37} height={37} />
          </Box>
          <Box ml='16px'>
            <Text color='textTips' fontSize='14px'>
              {t('Time left')}
            </Text>
            <Text color='white_black' fontSize='14px'>
              {formatDisplayBalanceWithSymbol(availableBalance, 0)}
            </Text>
          </Box>
        </Flex>
      </TimeInfoBox>
      {/* <User as={Link} to="/me">
        <ProfileMenu />
      </User> */}
    </Box>
  );
};
export default NavFooter;
