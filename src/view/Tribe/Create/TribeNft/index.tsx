import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useFetchSupportNFT } from 'view/Login/hook';

import NftAvatar from './list';

export const TribeNFT: React.FC<{
  nftList?: any[];
  nftTokenAddress?: string[];
}> = React.memo(({ nftList, nftTokenAddress }) => {
  const [nftTicketList, setNftTicketList] = useState([]);

  useEffect(() => {
    // 获取可用的nft列表
    const getNftList = async () => {
      const list = nftList
        .filter(
          v => nftTokenAddress.toString().indexOf(v.properties.token) !== -1,
        )
        .map(item => {
          return {
            name: item.name,
            image: item.image,
            nftToken: item.properties.token,
            nftId: item.properties.token_id,
          };
        });
      setNftTicketList(list);
    };
    if (nftTokenAddress && nftTokenAddress?.length) {
      getNftList();
    }
    console.log(nftList);
  }, [nftList, nftTokenAddress]);

  return (
    <React.Fragment>
      {nftTicketList.map((item, index) => {
        return <NftAvatar key={index} NftInfo={item} Nodata={false} />;
      })}
      {!nftTicketList.length && <NftAvatar Nodata={true} />}
    </React.Fragment>
  );
});
