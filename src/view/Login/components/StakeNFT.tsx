import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { getNftsList, getNftInfo } from 'apis/DsgRequest';
import { useTranslation } from 'contexts/Localization';
import { useFetchNftApproval, useFetchNftStakeType } from '../hook';
import { NftButton } from './approve';

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
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const [NftList, setNftList] = useState([])
  const [activeNft, setactiveNft] = useState(0)
  // nft列表
  const fetchData = async () => {
    if (account) {
      const result = await getNftsList(account)
      setNftList(result)
      GetStakeInfo(result)
    }
  }
  // 获取授权信息
  const GetApprovalInfo = async (list) => {
    const nftApprove = await useFetchNftApproval(account, list)
    const ApproveList = await getNftApprovalType(list, nftApprove)
    setNftList(ApproveList)
  }
  // 获取质押信息
  const GetStakeInfo = async (list) => {
    const nftStake = await useFetchNftStakeType(account)
    if (nftStake[0].token_id) {
      let result = await getNftInfo(nftStake[0].NFT_address, nftStake[0].token_id)
      result.isStakeMarket = true
      let AddStakeNftList = list
      AddStakeNftList.push(result)
      setNftList(AddStakeNftList)
    }
    GetApprovalInfo(list)
  }
  // 数据合并
  const getNftApprovalType = (nftlist, approveList) => {
    let list = []
    for (let i = 0; i < nftlist.length; i++) {
      list.push(nftlist[i])
      for (let j = 0; j < approveList.length; j++) {
        if (approveList[j].token === nftlist[i].properties.token) {
          list[i].isApprovedMarket = approveList[j].isApprovedMarket
        }
      }
    }
    return list
  }
  useEffect(() => {
    fetchData()
  }, [account])
  return (
    <Box>
      <Flex>
        {
          NftList.map(item => (
            <NftCard key={item.properties.id}>
              <NftImg src={item.image} onClick={() => setactiveNft(item.properties.token_id)} />
              {activeNft === item.properties.token_id && <NftButton item={item} token={item.properties.token} upDate={fetchData} />}
            </NftCard>
          ))
        }
      </Flex>
    </Box>
  );
};
