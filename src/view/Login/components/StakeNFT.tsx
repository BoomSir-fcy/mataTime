import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { getNftsList, getNftInfo } from 'apis/DsgRequest';
import { useTranslation } from 'contexts/Localization';
import { useFetchNftApproval, FetchNftStakeType, FetchNftsList, useFetchNftList } from '../hook';
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
  const [activeNft, setactiveNft] = useState(0)
  useFetchNftList()
  const NftList = useStore(p => p.loginReducer.nftList);
  console.log(NftList);
  if (!NftList.length) {
    dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
  } else {
    dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
  }

  return (
    <Box>
      <Flex>
        {
          NftList.map(item => (
            <NftCard key={item.properties.id}>
              <NftImg src={item.image} onClick={() => setactiveNft(item.properties.token_id)} />
              {activeNft === item.properties.token_id && <NftButton item={item} token={item.properties.token} />}
            </NftCard>
          ))
        }
      </Flex>
    </Box>
  );
};
