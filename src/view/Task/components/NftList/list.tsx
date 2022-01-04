import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Box, Text, Flex, Button } from 'uikit';
import { Avatar, Icon } from 'components';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';
import { useApproveNftsFarm } from 'view/Login/hook';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import Dots from 'components/Loader/Dots';
import { ContentBox } from '../Invite';

const NftFlex = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 90%;
  }
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: max-content;
  position: relative;
  cursor: pointer;
  &:not(:last-child) {
    ${({ theme }) => theme.mediaQueriesSize.marginr}
  }
`;
const NftAvatarBox = styled(Flex)`
  width: 211px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundThemeCard};
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;
const NftDrawBox = styled(Flex)`
  flex-direction: column;
  margin-top: 10px;
`;
const ActiveImg = styled(Avatar)`
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px ${({ theme }) => theme.colors.white};
`;
const AvatarBox = styled.div`
  position: relative;
  width: 102px;
  height: 104px;
  border-radius: 10px;
  .icon {
    position: absolute;
    bottom: 8%;
    right: 5%;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
`;

const ReceivedBox = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 5px;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
`;

interface Nft {
  address: string;
  needApprove: boolean;
}

const NftAvatar: React.FC<{
  NftInfo?: any;
  handleClickNft?: () => void;
}> = ({ NftInfo, handleClickNft }) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const NftList = useStore(p => p.loginReducer.nftList);

  const nft = useStore(p => p.loginReducer.nft);
  console.log(NftList, '========NftList');
  return (
    <ContentBox>
      <NftFlex>
        <NftAvatarBox>
          <Text mb='10px'>
            {NftInfo.name} #{NftInfo.properties.token_id}
          </Text>
          <ActiveImg disableFollow src={NftInfo.image} scale='ld' />
        </NftAvatarBox>
        <NftDrawBox>
          <Flex mb='10px' justifyContent='space-between' alignItems='center'>
            <Text small>点击NFT画板分享给好友</Text>
            <Text small>剩余2次</Text>
          </Flex>
          <Flex>
            {[1, 2, 3].map((item, index) => (
              <Column key={item}>
                <AvatarBox>
                  {item === 2 ? (
                    <ReceivedBox>
                      <Icon name={'icon-complete'} color='primary' size={25} />
                      <Text mt='16px' color='textTips' small>
                        {t('NFT has been collected')}
                      </Text>
                    </ReceivedBox>
                  ) : (
                    <>
                      <ActiveImg
                        disableFollow
                        // src={item.image}
                        scale='ld'
                        onClick={() => {
                          // if (!NftInfo.needApprove) {
                          //   dispatch(
                          //     storeAction.setUserNftStake({
                          //       isStakeNft: true,
                          //     }),
                          //   );
                          //   dispatch(storeAction.setUserNft(item));
                          // }
                          handleClickNft();
                        }}
                      />
                      <Icon
                        className='icon'
                        name={'icon-fenxiang'}
                        color='textPrimary'
                        size={18}
                      />
                    </>
                  )}
                </AvatarBox>
              </Column>
            ))}
          </Flex>
        </NftDrawBox>
      </NftFlex>
    </ContentBox>
  );
};

export default NftAvatar;
