import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useFetchSupportNFT } from 'view/Login/hook';

import NftAvatar from './list';

export const StakeNFT: React.FC<{ handleClickNft?: () => void }> = ({
  handleClickNft,
}) => {
  useFetchSupportNFT();

  const dispatch = useDispatch();
  const { account } = useWeb3React();
  // 是否授权
  const [isAllApprove, setisAllApprove] = useState([]);
  // 自己的Nft列表
  const NftList = useStore(p => p.loginReducer.nftList);
  // Nft地址  可用列表
  const NftAddrList = useStore(p => p.loginReducer.nftAddr);
  const signUpFail = useStore(p => p.loginReducer.signUpFail);
  const isStakeNft = useStore(p => p.loginReducer.isStakeNft);

  const getIsAllApprove = list => {
    let myList = [];
    for (let i = 0; i < list.length; i++) {
      // 当前NFT地址 是否授权
      for (let j = 0; j < NftAddrList.length; j++) {
        if (
          list[i].properties.token.toLowerCase() ===
          NftAddrList[j].toLowerCase()
        ) {
          if (!list[i].isApprovedMarket) {
            myList[j] = {
              address: list[i].properties.token.toLowerCase(),
              needApprove: true,
            };
          } else if (list[i].isApprovedMarket) {
            myList[j] = {
              address: list[i].properties.token.toLowerCase(),
              needApprove: false,
            };
          }
        }
      }
    }
    setisAllApprove(myList);
  };

  useEffect(() => {
    if (NftList.length && NftAddrList.length) {
      // getIsAllApprove(NftList);
    }
  }, [NftList]);

  return (
    <>
      {NftList.map((item, index) => {
        return (
          <NftAvatar
            key={index}
            NftInfo={item}
            handleClickNft={handleClickNft}
          />
        );
      })}
    </>
  );
};
