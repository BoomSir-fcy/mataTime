import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { toast } from 'react-toastify';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { getNftsList, getNftInfo } from 'apis/DsgRequest';
import { useTranslation } from 'contexts/Localization';
import { useFetchNftApproval, FetchNftStakeType, FetchNftsList, useFetchNftList, useApproveNftsFarm, useFetchSupportNFT } from '../hook';
// import { NftButton } from './approve';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import NftAvatar from 'components/NftList';

const Nft = styled(Box)`
  background:${({ theme }) => theme.colors.backgroundCard};
  margin-top:19px;
  padding:27px 26px 38px 34px;
  border-radius: 10px;
  width: 40vw;
  min-width: 600px;
`
const NftCard = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const NftImg = styled.img`
width: 200px;
height: 200px;
display: block;
margin-bottom: 10px;
cursor: pointer;
`


export const StakeNFT: React.FC = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const [activeNft, setactiveNft] = useState(0)
  // 是否授权
  const [isAllApprove, setisAllApprove] = useState([])
  // 自己的Nft列表
  const NftList = useStore(p => p.loginReducer.nftList);
  // Nft地址  可用列表
  const NftAddrList = useStore(p => p.loginReducer.nftAddr);

  const getIsAllApprove = (list) => {
    console.log(list, NftAddrList);
    let myList = []
    for (let i = 0; i < list.length; i++) {
      // 当前NFT地址 是否授权
      for (let j = 0; j < NftAddrList.length; j++) {
        if (list[i].properties.token.toLowerCase() === NftAddrList[j].toLowerCase()) {
          if (!list[i].isApprovedMarket) {
            myList[j] = {
              address: list[i].properties.token.toLowerCase(),
              needApprove: true
            }
          } else if (list[i].isApprovedMarket) {
            myList[j] = {
              address: list[i].properties.token.toLowerCase(),
              needApprove: false
            }
          }
        }
      }
    }
    console.log(myList);
    setisAllApprove(myList)
  }

  useEffect(() => {
    if (!NftList.length) {
      dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
    } else {
      NftAddrList.length && getIsAllApprove(NftList)
      dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    }
    return () => {
      const arr = []
      setisAllApprove(arr)
    }
  }, [NftList])
  return (
    <Nft>
      <Text fontSize='30px'>选择并质押头像</Text>
      {isAllApprove.map(item => (
        <NftAvatar key={item.address} NftInfo={item} />
      ))}
      {/* {!isAllApprove && NftAddrList.map(item => (
        <StakeAllBtn key={item} token={item} account={account} />
      ))} */}
      {/* <Flex>
        {
          NftList.map((item) => (
            <NftCard key={item.properties.id}>
              <NftImg src={item.image} onClick={() => setactiveNft(item.properties.token_id)} />
              {activeNft === item.properties.token_id && item.isApprovedMarket && <NftButton item={item} token={item.properties.token} />}
            </NftCard>
          ))
        }
      </Flex> */}
    </Nft>
  );
};

const StakeAllBtn = ({ token, account }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onApprove } = useApproveNftsFarm(token)
  const [pendingTx, setPendingTx] = useState(false)

  // 授权
  const handleApprove = useCallback(async () => {
    try {
      // 一键授权
      await onApprove()
      dispatch(fetchUserNftInfoAsync(account));
    } catch (e) {
      throw e;
    }
  }, [onApprove])
  return (
    <Button disabled={pendingTx} onClick={async () => {
      setPendingTx(true)
      try {
        // 授权 
        await handleApprove()
        toast.success('授权成功');
      } catch (error) {
        console.error(error)
        toast.error('操作失败');
      } finally {
        setPendingTx(false)
      }
    }}>一键授权</Button>
  );
};