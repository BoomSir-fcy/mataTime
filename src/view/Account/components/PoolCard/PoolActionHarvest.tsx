import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Box, Text, Card, Button, Heading, BalanceText } from 'uikit';
import { toast } from 'react-toastify';
import { fetchSpVaultUserAsync } from 'store/pools/thunks';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
import { Container } from 'components';
import { useApproveErc20Pool, useHarvesPoolId } from '../../hooks/pools';
import Dots from 'components/Loader/Dots';
import { getBalanceAmount } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import useConnectWallet from 'hooks/useConnectWallet';
import { BIG_ZERO } from 'utils/bigNumber';
import styled from 'styled-components';

const ContainerItem = styled(Container)`
  padding-top: 12px;
  background: ${({ theme }) => theme.card.background};
  padding-bottom: 12px;
`;

const HandleButton = ({
  isApproved,
  handleApprove,
  onHandleReward,
  showView,
  onView,
  t,
  account,
  onConnectWallet
}) => {
  const [pendingTx, setPendingTx] = useState(false);

  if (!account) {
    return <Button onClick={onConnectWallet}>{t('Connect Wallet')}</Button>;
  }
  if (!isApproved) {
    return (
      <Button
        width={100}
        disabled={pendingTx}
        onClick={async () => {
          await handleApprove();
        }}
      >
        {pendingTx ? <Dots>{t('Enabling')}</Dots> : t('Enable')}
      </Button>
    );
  }
  return (
    <Flex>
      {showView && (
        <Button
          width={100}
          margin="0 12px"
          disabled={pendingTx}
          onClick={onView}
        >
          {t('View')}
        </Button>
      )}
      <Button
        variant="primaryGreen"
        width={100}
        margin="0 12px"
        disabled={pendingTx}
        onClick={async () => {
          setPendingTx(true);
          await onHandleReward();
          setPendingTx(false);
        }}
      >
        {pendingTx ? <Dots>{t('Harvesting')}</Dots> : t('Harvest')}
      </Button>
    </Flex>
  );
};

interface HarvestProps {
  earnings?: string;
  isApproved?: boolean;
  depositToken: string;
  poolAddress: string;
  pid: string;
  rewardTokenPrice?: BigNumber;
  showView: boolean;
  onView: () => void;
}

const PoolActionHarvest: React.FC<HarvestProps> = ({
  earnings = '0',
  isApproved,
  depositToken,
  poolAddress,
  pid,
  onView,
  showView,
  rewardTokenPrice
}) => {
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onConnectWallet } = useConnectWallet();

  const { onApprove } = useApproveErc20Pool(depositToken, poolAddress);
  const handleApprove = useCallback(async () => {
    try {
      await onApprove();
      dispatch(fetchSpVaultUserAsync(account));
    } catch (e) {
      console.error(e);
    }
  }, [onApprove, dispatch, account]);

  const { onHarvest } = useHarvesPoolId(pid);
  const onHandleReward = useCallback(async () => {
    try {
      await onHarvest();
      dispatch(fetchSpVaultUserAsync(account));
      toast.success(
        <>
          <Text color="blank">
            {t('Your earnings have been harvested to your wallet!')}
          </Text>
        </>
      );
    } catch (error) {
      if ((error as any)?.code !== 4001) {
        toast.error(
          <>
            <Text color="blank">{t('Error')}</Text>
            <Text color="blank">
              {t(
                'Please try again. Confirm the transaction and make sure you are paying enough gas!'
              )}
            </Text>
          </>
        );
      }
    }
  }, [onHarvest, dispatch, account]);

  return (
    <ContainerItem>
      <Flex justifyContent="center" alignItems="center">
        <HandleButton
          isApproved={isApproved}
          handleApprove={handleApprove}
          onHandleReward={onHandleReward}
          onView={onView}
          account={account}
          onConnectWallet={onConnectWallet}
          showView={showView}
          t={t}
        />
      </Flex>
    </ContainerItem>
  );
};

export default PoolActionHarvest;
