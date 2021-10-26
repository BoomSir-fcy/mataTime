import styled from "styled-components";
import { Flex ,Box} from 'uikit';
import { mediaQueries, mediaQueriesSize } from "uikit/theme/base";

export const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
  display:flex;
justify-content:center;
`
export const LeftCard = styled(Flex)`
  // width: 375px;
`
export const CenterCard = styled(Box)`
  // flex: 1;
  ${mediaQueriesSize.marginLRmd}
  // width:670px;
`
export const RightCard = styled.div`
  width: 375px;
`
export const CommentListBox = styled.div`
background-color:#191F2D;
border-radius: 10px;
overflow: hidden;
margin-bottom:50px;
color:#fff;
`
export const CommentTitle = styled(Flex)`
padding-left:29px;
padding-right:17px;
height:54px;
font-size: 18px;
font-weight: bold;
.sort-box{
  display: flex;
  & > div{
  display: flex;
    margin-left:25px;
  }
}
`
export const CommentItem = styled.div`
:hover{
  background-color: #1F2534;
  transition:all 0.3s;
}
padding:18px 18px 0 28px;
`
export const CommentHeader  = styled(Flex)`
.relative-time{
  margin-top:8px;
  font-size: 14px;
  color: #B5B5B5;
}
.topic{
  display:flex;
  align-items: center;
  margin-left:27px;
  padding:0 10px;
  height:35px;
  font-size: 14px;
  color: #FFFFFF;
  border: 2px solid #4168ED;
  border-radius: 10px;
}
.reply{
  margin-left:18px;
  font-size: 16px;
font-weight: 400;
color: #B5B5B5;
line-height: 35px;
span{ 
  cursor: pointer;
  color: #4168ED;
}
}
`
export const CommentContent = styled(Box)`
padding-right:30px;
margin:20px 0;
`
export const CommentFooter  = styled(Flex)`
padding-left:100px;
align-items:center;
height:60px;
color:#B5B5B5;
border-bottom: solid 1px #4D535F;
& div{
  padding:  10px;
  margin-right:30px;
}
`
export const CommentListFooter = styled.div`
text-align:center;
line-height:60px;
font-size: 14px;
font-weight: 400;
color: #B5B5B5;
`