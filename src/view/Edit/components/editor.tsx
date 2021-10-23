import React from 'react';
import styled from "styled-components";
import { Avatar } from '../../../components/Avatar';
import { Box, Text, Button, Flex } from 'uikit';
import {Certification} from '../../../components/Profile/certification';
import { mediaQueries, mediaQueriesSize } from "uikit/theme/base";


const AboutWarpper = styled(Box)`
  width: 800px;
  height: 60px;
  margin-bottom: 19px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
`
const BgUpload = styled(Box)`
  width: 800px;
  height:280px;
  margin-bottom:19px;
  border-radius: ${({ theme }) => theme.radii.card};
  background: skyblue;
`
const Btn = styled(Box)`
  text-align: center;
  padding-top: 202px;
`
const NftAvatar = styled(Box)`
  width: 800px;
  height:350px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
`
const Column = styled(Flex)`
  width: 100%;
  align-items: left;
  flex-direction: column;
  ${mediaQueriesSize.marginbmd}
`
const Rows = styled(Flex)`
  width: 100%;
  align-items: center;
  flex-direction: row;
  ${mediaQueriesSize.marginbmd}
`
const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: bold;
  ${mediaQueriesSize.marginbmd}
`
const Authorize = styled(Flex)`
  width: 100%;
  height: 112px;
  background: #292D34;
  border-radius: ${({ theme }) => theme.radii.card};
  justify-content: center;
  align-items: center;
`
const IptName = styled(Box)`
  width: 381px;
  height: 50px;
  background: #292D34;
  border-radius: ${({ theme }) => theme.radii.card};
`
const IptSize = styled(Box)`
  width: 124px;
  height:26px;
  background: #4D535F;
  border-radius: ${({ theme }) => theme.radii.card};
`
const SetMsg = styled(Box)`
  width: 100%;
  height:562px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
`
const Title = styled(Box)`
  width: 130px;
`
const TxtAreaRows = styled(Flex)`
  width: 100%;
  flex-direction: row;
  ${mediaQueriesSize.marginbmd}
`
const TxtArea = styled(Box)`
  ${mediaQueriesSize.marginbmd};
  border-radius: ${({ theme }) => theme.radii.card};
`

const Editor = () => {
  return (
    <div>
      <AboutWarpper>
        <Flex justifyContent="space-between" style={{position:'relative',top:'-40%'}}>
          <div style={{color:'#fff',lineHeight:'40px'}}>账号资料编辑</div>
          <Button >保存最新修改</Button>
        </Flex>
      </AboutWarpper>
      <BgUpload>
        <Btn><Button>上传背景墙</Button></Btn>
      </BgUpload>
      <NftAvatar>
        <Flex>
          <Column>
            <div style={{marginBottom:'28px'}}>
              <div style={{color:'#fff',float:'left',marginRight:'31px'}}>NFT 头像</div>
              <div style={{color:'gray',float:'left'}}>平台仅支持将持有的NFT图片作为头像，暂不支持上传图片</div>
            </div>
            <Rows>
              <Avatar src="" scale="ld"/>
              <div style={{marginLeft:'18px'}}>
                <Name>Baby fuck me</Name>
                <div>
                  <Certification /> 
                  <p style={{color:'#B5B5B5',float:'left'}}> #3292</p>
                </div>
              </div>
            </Rows>
            <Authorize style={{marginTop:'28px'}}>
              <Button>授权获取</Button>
            </Authorize>
          </Column>
        </Flex>
      </NftAvatar>

      {/* <SetMsg style={{marginTop:'28px'}}>
        <Rows>
          <Title style={{color:'#fff'}}>* 设置昵称</Title>
          <Column>
            <IptName>
              <Rows style={{position:'relative',justifyContent:'space-between'}}>
                <p style={{color:'#B5B5B5',lineHeight:'50px'}}>Baby fuck me</p>
                <IptSize>0x259.....d59w5</IptSize>
              </Rows>
            </IptName>
            <div style={{color:'#B5B5B5',marginTop:'14px'}}>4~32个字符，支持中英文、数字</div>
          </Column>
        </Rows>
        <Rows style={{color:'#fff'}}>
          <Title>* 显示格式</Title>
          <input type="radio" name="0X格式" />&nbsp; 0X格式
          <input type="radio" name="域名格式" style={{marginLeft:'38px'}}/>&nbsp; 域名格式
        </Rows>
        <TxtAreaRows style={{marginTop:'58px',color:'#fff'}}>
          <Title>* 个人简介</Title>
          <TxtArea>
            <textarea style={{background:'#292D34',width:'598px',height:'210px',borderRadius:'10px',border:'none'}}/>
          </TxtArea>
        </TxtAreaRows>
      </SetMsg> */}
    </div>
  )
}

export default Editor;