import {Box,Text,Flex,Button} from 'uikit';
import styled from "styled-components";
import { About, Avatar, Editor, ModalWrapper } from 'components';

const NftAvatar = styled(Box)`
  overflow:hidden;
  background: skyblue;
  margin-top:19px;
  padding:27px 26px 38px 34px;
  border-radius: 10px;
`
const Title = styled(Box)`
  float: left;
  color:#fff;
  font-weight: bold;
  margin-right: 31px;
`
const Point = styled(Text)`
  /* float: left; */
  color:#B5B5B5;
  font-size:16px;
`
const Rows = styled(Flex)`
  /* float:left; */
  margin-top:28px;
`
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
`
const UserName = styled(Text)`
  color:#fff;
  font-weight:bold;
`
const Authorize = styled(Flex)`
  justify-content: center;
  align-items:center;
  height:112px;
  border-radius:10px;
  background:#292D34;
  margin-top:28px;
`


const Nft = () => {
  return (
    <div>
      <NftAvatar>
        <div>
          <Title>NFT 头像</Title>
          <Point>平台仅支持将持有的NFT图片作为头像，暂不支持上传图片</Point>
        </div>
        <div>
          <Rows>
            <Avatar src="" scale="ld" style={{marginRight:'18px'}}/>
            <Column>
              <UserName>Baby fuck me</UserName>
              <div>#3292</div>
            </Column>
          </Rows>
          <Authorize>
            <Button>授权获取</Button>
          </Authorize>
        </div>
      </NftAvatar>
    </div>
  )
}
export default Nft;

