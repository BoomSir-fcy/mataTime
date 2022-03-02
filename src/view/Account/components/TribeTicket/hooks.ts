import { useWeb3React } from '@web3-react/core';
import BigNumber from "bignumber.js"
import { ethers } from 'ethers';
import { FetchStatus } from "config/types"
import { useERC20, useTribeTicketsContract } from "hooks/useContract"
import { useCallback, useEffect, useState } from "react"
import { getMatterAddress, getTribeTicketsAddress } from 'utils/addressHelpers';
import { BIG_ZERO } from "utils/bigNumber"
import { getTicketNftContract, getTribeTicketsContract } from 'utils/contractHelpers';

export const useTribeTicketExchange = () => {
  const contract = useTribeTicketsContract()

  const handle = useCallback(async (value) => {
    const tx = await contract.ExchangeTicketsNFT(value, {});
    const receipt = await tx.wait();
    return receipt.status;
  }, [])

  return { exchangeHandle: handle }
}

export const useMatterAllowanceTribeTicket = () => {
  const matterAddress = getMatterAddress()
  const tribeTicketsAddress = getTribeTicketsAddress()
  const contract = useERC20(matterAddress)

  const handle = useCallback(async () => {
    const tx = await contract.approve(
      tribeTicketsAddress,
      ethers.constants.MaxUint256,
    );
    const receipt = await tx.wait();
    return receipt.status;
  }, [])

  return { handleApprove: handle }
}

export const useFetchTribeTicketPrice = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [priceState, setPriceState] = useState({
    price: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { account } = useWeb3React();

  useEffect(() => {
    const fetchPrice = async () => {
      const contract = getTribeTicketsContract()
      try {
        console.log(contract)
        const res = await contract._price();
        setPriceState({
          price: new BigNumber(res.toString()),
          fetchStatus: SUCCESS,
        });
      } catch (e) {
        console.error(e);
        setPriceState(prev => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };

    if (account) {
      fetchPrice();
    }
  }, [account, SUCCESS, FAILED]);

  return priceState;
}

