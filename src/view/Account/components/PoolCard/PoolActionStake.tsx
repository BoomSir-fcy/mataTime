import React, { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import { Flex, Text, Box, Button } from 'uikit';
import { useSinglePoolState } from 'store/pools/hooks';
import { fetchSpVaultUserAsync } from 'store/pools/thunks';
import { Icon, ModalWrapper } from 'components';
import { useStakePool, useWithdrawPool } from '../../hooks/pools';
import StakeModal from '../PoolModal/StakeModal';
import UnStakeModal from '../PoolModal/UnStakeModal';
import PoolStakeInfo, { PoolDispalynUserData } from './PoolStakeInfo';

const ButtonStyled = styled(Button)`
  padding: 0 8px;
`;

interface PoolActionStakeProps {
  isApproved: boolean;
  depositToken: address;
  rewardToken0: address;
  rewardToken1: address;
  depositSymbol: string;
  rewardToken0Symbol: string;
  rewardToken1Symbol: string;
  poolAddress: string;
  rewardToken0Decimals: number;
  rewardToken1Decimals: number;
  depositDecimals: number;
  pid: string;
  dispalynUserData?: PoolDispalynUserData;
}

const PoolActionStake: React.FC<PoolActionStakeProps> = ({
  isApproved,
  depositToken,
  rewardToken0,
  rewardToken1,
  depositSymbol,
  rewardToken0Symbol,
  rewardToken1Symbol,
  rewardToken0Decimals,
  rewardToken1Decimals,
  depositDecimals,
  poolAddress,
  pid,
  dispalynUserData,
}) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { userStakesMap } = useSinglePoolState();
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [visibleView, setVisibleView] = useState(false);

  const { onStake } = useStakePool(pid);
  const { onWithdraw } = useWithdrawPool();

  const updateUserData = useCallback(() => {
    dispatch(fetchSpVaultUserAsync(account));
  }, [dispatch, account]);

  return (
    <Box>
      <PoolStakeInfo
        depositToken={depositToken}
        rewardToken0={rewardToken0}
        rewardToken1={rewardToken1}
        depositSymbol={depositSymbol}
        rewardToken0Symbol={rewardToken0Symbol}
        rewardToken1Symbol={rewardToken1Symbol}
        {...dispalynUserData}
      >
        {isApproved &&
          (userStakesMap[pid] ? (
            <Flex>
              {/* <Button
                padding={0}
                width={23}
                height={23}
                style={{
                  borderRadius: '0',
                }}
                onClick={() => setVisible(true)}
              >
                <Text style={{ transform: "translateY(-3%)" }} fontSize='22px' bold lineHeight={1} padding={0} color='white'>+</Text>
                
              </Button> */}
              <Icon
                name='icon-jia'
                size={23}
                color='ThemeText'
                onClick={() => setVisible(true)}
              />
              {/* <Button onClick={() => setVisible(true)}>{t('Increase')}</Button> */}
              {/* <Button onClick={() => setVisibleView(true)} ml="12px">{t('View')}</Button> */}
            </Flex>
          ) : (
            <Icon
              name='icon-jia'
              size={23}
              color='ThemeText'
              onClick={() => setVisible(true)}
            />
            // <Button
            //   padding={0}
            //   width={23}
            //   height={23}
            //   style={{
            //     borderRadius: '0',
            //   }}
            //   onClick={() => setVisible(true)}
            // >
            //   <Text
            //     style={{ transform: 'translateY(-3%)' }}
            //     fontSize='22px'
            //     bold
            //     lineHeight={1}
            //     padding={0}
            //   >
            //     +
            //   </Text>
            // </Button>
          ))}
      </PoolStakeInfo>
      <ModalWrapper
        title={t('Stake')}
        creactOnUse
        visible={visible}
        setVisible={setVisible}
      >
        <StakeModal
          max={dispalynUserData.tokenBalance}
          decimals={depositDecimals}
          depositSymbol={depositSymbol}
          onConfirm={async amount => {
            await onStake(amount);
            updateUserData();
          }}
          onDismiss={() => setVisible(false)}
        />
      </ModalWrapper>
      <ModalWrapper
        fillBody
        title={t('View')}
        creactOnUse
        visible={visibleView}
        setVisible={setVisibleView}
      >
        <UnStakeModal
          onConfirm={async pid => {
            await onWithdraw(pid);
            updateUserData();
          }}
          onDismiss={() => setVisibleView(false)}
          depositToken={depositToken}
          rewardToken0={rewardToken0}
          rewardToken1={rewardToken1}
          depositSymbol={depositSymbol}
          rewardToken0Symbol={rewardToken0Symbol}
          rewardToken1Symbol={rewardToken1Symbol}
          rewardToken0Decimals={rewardToken0Decimals}
          rewardToken1Decimals={rewardToken1Decimals}
          depositDecimals={depositDecimals}
          stakes={userStakesMap[pid]}
        />
      </ModalWrapper>
    </Box>
  );
  // max: BigNumber
  // decimals?: number
  // onConfirm?: (amount: string) => void
  // onDismiss?: () => void
};

export default PoolActionStake;
