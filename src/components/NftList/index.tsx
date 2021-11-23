import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { Box, Flex, Text, Button, Card } from 'uikit';
import NftAvatar from './list';

const Nft = styled(Box)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  margin-top: 19px;
  padding: 27px 26px 38px 34px;
  border-radius: 10px;
  width: 40vw;
  min-width: 600px;
`;
const NftCard = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const NftImg = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const StakeNFT: React.FC<{
  status?: number;
}> = ({ status }) => {
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
              needApprove: true
            };
          } else if (list[i].isApprovedMarket) {
            myList[j] = {
              address: list[i].properties.token.toLowerCase(),
              needApprove: false
            };
          }
        }
      }
    }
    setisAllApprove(myList);
  };

  useEffect(() => {
    // if (!NftList.length && !isStakeNft) {
    //   dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
    // } else {
    //   NftAddrList.length && getIsAllApprove(NftList)
    //   dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    // }
    if (NftList.length && NftAddrList.length) {
      getIsAllApprove(NftList);
    }
    return () => {
      const arr = [];
      setisAllApprove(arr);
    };
  }, [NftList]);

  return (
    <React.Fragment>
      {isAllApprove.map((item, index) => {
        return (
          <NftAvatar
            key={index}
            status={status}
            NftInfo={item}
            Nodata={false}
          />
        );
      })}
      {!signUpFail && !isAllApprove && (
        <NftAvatar status={status} Nodata={true} />
      )}
    </React.Fragment>
  );
};
