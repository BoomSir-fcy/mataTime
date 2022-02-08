import { useEffect, useState, useRef, useMemo } from 'react'
import { Biconomy } from "@biconomy/mexa";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { BICONOMY_DAPP_API_KEY } from 'config';
import { providers } from 'ethers';

/**
 * https://docs.biconomy.io/sdk/biconomy-sdk-mexa
 * @returns Web3ReactContextInterface<biconomy.Web3Provider>
 */
const useBiconomyWeb3React = () => {
  const { library, ...web3React } = useActiveWeb3React()
  const refEth = useRef(library)
  const [ercForwarderClient, setErcForwarderClient] = useState(null)
  const [permitClient, setPermitClient] = useState(null)

  useEffect(() => {
    if (library !== refEth.current) {
      refEth.current = library
    }
  }, [library])

  const [ethersProvider, biconomy ] = useMemo(() => {
    const biconomy = new Biconomy(refEth.current, {apiKey: BICONOMY_DAPP_API_KEY, debug: process.env.NODE_ENV !== 'production'});
    const biconomyProvider = new providers.Web3Provider(biconomy);
    return [biconomyProvider, biconomy]
  }, [refEth.current])

  useEffect(() => {
    biconomy.onEvent(biconomy.READY, () => {
      // Initialize your dapp here like getting user accounts etc
      setErcForwarderClient(biconomy.erc20ForwarderClient);
      setPermitClient(biconomy.permitClient);
    }).onEvent(biconomy.ERROR, (error, message) => {
      // Handle error while initializing mexa
    });
  }, [])

  return { library: ethersProvider, ercForwarderClient, permitClient, biconomy, ...web3React }
}

export default useBiconomyWeb3React;
