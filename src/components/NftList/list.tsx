import React, { useCallback, useState } from 'react';
import { Box, Text, Flex, Button } from 'uikit';
import styled from "styled-components";
import { Avatar } from 'components';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';
import { useApproveNftsFarm } from 'view/Login/hook';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { NftButton } from './approve';
import Dots from '../Loader/Dots';

const Point = styled(Text)`
  color:${({ theme }) => theme.colors.textTips};
  font-size:16px;
`
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-width: 160px;
  margin-bottom: 20px;
  position: relative;
  .active{
    box-shadow: 0px 0px 9px 5px ${({ theme }) => theme.colors.backgroundPrimary};
  }
`
const GetAuthorizeBox = styled(Box)`
padding:17px;
margin-top:28px;
border-radius:10px;
background: ${({ theme }) => theme.colors.backgroundTextArea};
`
const GetAuthorize = styled(Flex)`
/* justify-content: space-between; */
padding-top:26px;
overflow-x: auto;
`
const AvatarName = styled(Text)`
text-align: center;
margin-top: 14px;
font-size:14px;
color:${({ theme }) => theme.colors.textTips};
`
const ActiveImg = styled.img`
position: absolute;
top:0;
right: 30px;
width: 30px;
`
const NodataDom = styled.div`
color:${({ theme }) => theme.colors.textTips};
text-align: center;
`
const NowrapBtn = styled(Button)`
width: max-content;
word-break: keep-all;
`
const AvatarBox = styled.div`
border: 2px solid #E0F9D0;
border-radius: 10px;
`

const NftItem = {
  description: '',
  image: '',
  isApprovedMarket: false,
  isStakeMarket: false,
  name: '',
  properties: {
    author: '',
    createdTime: 0,
    id: '',
    level: 0,
    owner: '',
    owner_status: 0,
    power: 0,
    res: '',
    token: '',
    token_id: ''
  }
}

interface Nft {
  address: string,
  needApprove: boolean
}
const NftAvatar: React.FC<{
  NftInfo?: Nft,
  Nodata: boolean
}> = ({ NftInfo, Nodata }) => {
  const { account } = useWeb3React();
  const [ActiveAvInfo, setActiveAvInfo] = useState(NftItem)
  const NftList = useStore(p => p.loginReducer.nftList);
  const { t } = useTranslation();

  return (
    <GetAuthorizeBox>
      {
        Nodata ?
          <NodataDom>
            <Text mb='10px'>获取更多NTF头像可更换头像</Text>
            <Button>{t('loginGetNft')}</Button>
          </NodataDom>
          :
          <>
            <Flex justifyContent='space-between' alignItems='center'>
              <Point>支持部分主流NFT系列，即将支持更多的NFT系列头像</Point>
              {NftInfo?.needApprove ? <StakeAllBtn token={NftInfo.address} account={account} /> : <NftButton item={ActiveAvInfo} />}
            </Flex >
            <GetAuthorize>
              {
                (NftList.map(item => (
                  NftInfo.address === item.properties.token ?
                    < Column key={item.properties.token_id} >
                      {/* {ActiveAvInfo.properties?.token_id === item.properties.token_id && <ActiveImg src={require('./img/active.png').default} />} */}
                      <AvatarBox className={ActiveAvInfo.properties?.token_id === item.properties.token_id && 'active'}>
                        < Avatar src={item.image} scale="ld" onClick={() => {
                          if (!NftInfo.needApprove) {
                            setActiveAvInfo(item)
                          }
                        }} />
                      </AvatarBox>
                      <AvatarName>{item.name} #{item.properties.token_id}</AvatarName>
                    </Column>
                    : <></>
                )))
              }
            </GetAuthorize>
          </>
      }

    </GetAuthorizeBox >
  )
}

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
    <NowrapBtn disabled={pendingTx} onClick={async () => {
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
    }}>{pendingTx ? (<Dots>{t('授权中')}</Dots>) : (t('授权'))}</NowrapBtn>
  );
};
export default NftAvatar

