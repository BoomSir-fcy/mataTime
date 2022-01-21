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

  useEffect(() => {
    if (library !== refEth.current) {
      refEth.current = library
    }
  }, [library])

  const ethersProvider = useMemo(() => {
    const biconomy = new Biconomy(refEth.current, {apiKey: BICONOMY_DAPP_API_KEY, debug: true});
    const biconomyProvider = new providers.Web3Provider(biconomy);
    return biconomyProvider
  }, [refEth.current])

  return { library: ethersProvider, ...web3React }
}

export default useBiconomyWeb3React;
