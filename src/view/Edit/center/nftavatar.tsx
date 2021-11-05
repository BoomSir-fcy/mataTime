import { Box, Text, Flex, Button } from 'uikit';
import styled from "styled-components";
import { Avatar } from 'components';

const Nft = styled(Box)`
  overflow:hidden;
  background: #191F2D;
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
const GetAuthorizeBox = styled(Box)`
padding:17px;
margin-top:28px;
border-radius:10px;
`
const GetAuthorize = styled(Flex)`
justify-content: space-between;
margin-top:26px;
`
const AvatarName = styled(Text)`
text-align: center;
margin-top: 21px;
font-size:14px;
color:#B5B5B5;
`

const NftAvatar: React.FC = () => {
  return (
    <div>
      <Nft>
        <div>
          <Title>NFT 头像</Title>
          <Point>平台仅支持将持有的NFT图片作为头像，暂不支持上传图片</Point>
        </div>
        <div>
          <Rows>
            <Avatar src="" scale="ld" style={{ marginRight: '18px' }} />
            <Column>
              <UserName>Baby fuck me</UserName>
              <div style={{ color: '#B5B5B5' }}>#3292</div>
            </Column>
          </Rows>
          <Authorize>
            <Button>授权获取</Button>
          </Authorize>
          <GetAuthorizeBox style={{ background: '#292D34' }}>
            <Point style={{ textAlign: 'center' }}>平台仅支持将持有的NFT图片作为头像，暂不支持上传图片</Point>
            <GetAuthorize>
              <Column>
                <Avatar src="" scale="ld" />
                <AvatarName>DSG #2636</AvatarName>
              </Column>
              <Column>
                <Avatar src="" scale="ld" />
                <AvatarName>DSG #2636</AvatarName>
              </Column>
              <Column>
                <Avatar src="" scale="ld" />
                <AvatarName>DSG #2636</AvatarName>
              </Column>
              <Column>
                <Avatar src="" scale="ld" />
                <AvatarName>DSG #2636</AvatarName>
              </Column>
            </GetAuthorize>
          </GetAuthorizeBox>
        </div>
      </Nft>
    </div>
  )
}
export default NftAvatar

