import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Flex, Box, Text, Card, Image, Input, Button } from 'uikit';
import { ConnectWalletButton, Icon } from 'components';
import { useTokenBalance } from 'hooks/useTokenBalance';
import CurrencyInputPanel from './CurrencyInputPanel';
import NumericalInput from './NumericalInput';
import Dots from 'components/Loader/Dots';
import { getMatterAddress } from 'utils/addressHelpers';
import { formatDisplayApr, getBalanceAmount } from 'utils/formatBalance';
import {
  useFetchTribeTicketPrice,
  useMatterAllowanceTribeTicket,
  useTribeTicketExchange,
} from './hooks';
import { useToast } from 'hooks';
import { useStore } from 'store';
import BigNumber from 'bignumber.js';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useDispatch } from 'react-redux';
import { fetchTribeTicketInfoAsync } from 'store/wallet/reducer';
import { useFetchTribeTicketInfo } from 'store/wallet/hooks';
import { useTicketNftList, useTribeState } from 'store/tribe/hooks';
// import { fetchTicketNftListAsync } from 'store/tribe';
import { Link } from 'react-router-dom';
import { useTranslation } from 'contexts';

const CardStyled = styled(Card)`
  width: 380px;
  max-width: 100%;
  ${({ theme }) => theme.mediaQueriesSize.margin}
  margin-top: 65px !important;
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

const InputCard = styled(Card)`
  background: ${({ theme }) => theme.colors.input};
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;

const MAX_EXCHANGE_AMOUNT = 99;

const TribeTicket = () => {
  const { account } = useActiveWeb3React();
  const matterAddress = getMatterAddress();
  const { toastError } = useToast();
  const { t } = useTranslation();

  const { handleFetch: handleFetchTicketInfo } = useFetchTribeTicketInfo();
  const { handleFetch } = useTicketNftList();

  const { ticketNftList, activeNftInfo } = useTribeState();

  const { balance } = useTokenBalance(matterAddress);
  const { handleApprove } = useMatterAllowanceTribeTicket();
  const [loading, setLoading] = useState(false);
  const tribeTickets = useStore(p => p.wallet.TribeTickets);

  const tribeTicketsInfo = useMemo(() => {
    return {
      price: new BigNumber(tribeTickets.price),
      allowance: new BigNumber(tribeTickets.allowance),
      max_tickets: new BigNumber(tribeTickets.max_tickets),
    };
  }, [tribeTickets]);

  const [value, setValue] = useState('1');
  const { exchangeHandle } = useTribeTicketExchange();

  const maxAmount = useMemo(() => {
    const balanceMax =
      Math.floor(balance.div(tribeTicketsInfo.price).toNumber()) || 0;

    return tribeTicketsInfo.max_tickets.isGreaterThan(balanceMax)
      ? balanceMax
      : tribeTicketsInfo.max_tickets.toString(10);
  }, [tribeTicketsInfo.price, tribeTicketsInfo.max_tickets, balance]);

  const onExchange = useCallback(async () => {
    try {
      setLoading(true);
      await exchangeHandle(tribeTicketsInfo.price.times(value).toString());
      setLoading(false);
      handleFetch();
      handleFetchTicketInfo();
    } catch (error) {
      setLoading(false);
    }
  }, [
    value,
    tribeTicketsInfo.price,
    handleFetchTicketInfo,
    handleFetch,
    account,
  ]);

  const dispatch = useDispatch();

  const [userApprove, setUserApprove] = useState(false);
  const isApprove = useMemo(() => {
    return tribeTicketsInfo?.allowance?.isGreaterThan(0) || userApprove;
  }, [userApprove, tribeTicketsInfo.allowance]);

  return (
    <Flex flexWrap='wrap' justifyContent='space-around'>
      <CardStyled isRadius mt='65px'>
        <Text bold fontSize='18px'>
          {t('Ticket Exchange')}
        </Text>
        <Flex mt='14px' justifyContent='space-between'>
          <Text color='textTips' fontSize='14px'>
            {t('Balance')}:{' '}
            {formatDisplayApr(getBalanceAmount(balance).toNumber())}
          </Text>
          <Button
            onClick={() => {
              setValue(`${maxAmount}`);
            }}
            margin='0'
            padding='0'
            height='auto'
            variant='text'
          >
            <Text color='textPrimary' fontSize='14px'>
              MAX
            </Text>
          </Button>
        </Flex>
        <InputCard mt='6px' isRadius>
          <Flex mt='8px' justifyContent='space-between'>
            <Text>{t('Price')}</Text>
            <Flex alignItems='center'>
              <Box width='22px' height='22px'>
                <Image width={22} height={22} src='/images/tokens/MATTER.svg' />
              </Box>
              <Text ml='4px'>MATTER</Text>
            </Flex>
          </Flex>
          {/* <Input noShadow /> */}
          <Box padding='16px 0'>
            <NumericalInput
              className='token-amount-input'
              value={formatDisplayApr(
                getBalanceAmount(tribeTicketsInfo.price).toNumber(),
              )}
              readOnly
              onUserInput={v => null}
            />
          </Box>
        </InputCard>
        <Flex padding='16px 0' justifyContent='center'>
          <Icon name='icon-arrowTop' size={20} />
        </Flex>
        <InputCard isRadius>
          <Flex mt='10px' justifyContent='space-between'>
            <Text>NFT</Text>
            <Flex>
              <Text>Ticket</Text>
            </Flex>
          </Flex>
          {/* <Input noShadow /> */}
          <Box padding='16px 0'>
            <NumericalInput
              className='token-amount-input'
              value={value}
              onUserInput={val => {
                setValue(val);
              }}
            />
          </Box>
        </InputCard>
        <Text fontSize='14px' mt='8px'>
          {t('Exchangeable Ticket Quantity')}: {maxAmount}
        </Text>
        {!account ? (
          <ConnectWalletButton scale='ld' width='100%' />
        ) : isApprove ? (
          <Button
            onClick={onExchange}
            mb='22px'
            scale='ld'
            disabled={loading}
            width='100%'
            mt='24px'
          >
            {loading ? <Dots>{t('Exchanging')}</Dots> : t('Exchang')}
          </Button>
        ) : (
          <Button
            onClick={async () => {
              try {
                setLoading(true);
                await handleApprove();
                setUserApprove(true);
                dispatch(fetchTribeTicketInfoAsync({ account }));
                setLoading(false);
              } catch (error) {
                setLoading(false);
                console.log(error);
                toastError(
                  'Please try again. Confirm the transaction and make sure you are paying enough gas!',
                );
              }
            }}
            disabled={loading}
            mb='22px'
            scale='ld'
            width='100%'
            mt='24px'
          >
            {loading ? <Dots>{t('Enabling')}</Dots> : t('Enable')}
          </Button>
        )}
      </CardStyled>
      <CardStyled isRadius mt='65px'>
        <Text bold fontSize='18px'>
          {t('Ticket Exchange')}
        </Text>
        <Flex mt='19px' justifyContent='center'>
          <Image
            src='/images/tokens/tribe-tickets-nft.jpg'
            width={205}
            height={205}
          />
        </Flex>
        <Flex mt='18px'>
          <Text>{t('Tribe Ticket')}</Text>
          <Text>
            {t('Amount')}: {ticketNftList.length}
          </Text>
        </Flex>
        <Text fontSize='14px' color='textTips' mt='8px'>
          {t('You can use the ticket to create a tribe.')}
        </Text>
        <Box mb='22px'>
          <Link to='/tribe/create'>
            <Button scale='ld' width='100%' mt='18px'>
              {t('Use')}
            </Button>
          </Link>
        </Box>
      </CardStyled>
    </Flex>
  );
};

export default TribeTicket;
