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
import { NftButton } from './approve';
import { fetchUserNftInfoAsync } from 'store/login/reducer';

const SignUpWarpper = styled(Flex)`
  padding-top: 50px;
  padding-bottom: 100px;
  flex-direction: column;
  align-items: center;
`;
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
  useFetchSupportNFT()
  useFetchNftList()
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const [activeNft, setactiveNft] = useState(0)
  const [isAllApprove, setisAllApprove] = useState(true)
  const NftList = useStore(p => p.loginReducer.nftList);
  const NftAddrList = useStore(p => p.loginReducer.nftAddr);


  const getIsAllApprove = (list) => {
    for (let i = 0; i < list.length; i++) {
      // 是否需要一键授权
      if (!list[i].isApprovedMarket) {
        setisAllApprove(false)
      } else {
        setisAllApprove(true)
        return
      }
    }
  }

  useEffect(() => {
    if (!NftList.length) {
      dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
    } else {
      getIsAllApprove(NftList)
      dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    }
    return () => {
      setisAllApprove(false)
    }
  }, [NftList])
  return (
    <Box>
      {!isAllApprove && NftAddrList.map(item => (
        <StakeAllBtn key={item} token={item} account={account} />
      ))}
      <Flex>
        {
          NftList.map((item) => (
            <NftCard key={item.properties.id}>
              <NftImg src={item.image} onClick={() => setactiveNft(item.properties.token_id)} />
              {activeNft === item.properties.token_id && item.isApprovedMarket && <NftButton item={item} token={item.properties.token} />}
            </NftCard>
          ))
        }
      </Flex>
    </Box>
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