import styled from "styled-components";
import { Flex, Button } from 'uikit';

export const HeaderBox = styled(Flex)`
justify-content: space-between;
padding: 22px 16px;
background: #191F2D;
border-radius: 10px;
margin-bottom:12px;
font-size: 18px;
font-weight: bold;
color: #FFFFFF;
`
export const Header = (props: { title: string, clickTitle?: () => void }) => {
  const { title } = props
  const clickTitle = (e) => {
    console.log(e);

  }
  return (
    <HeaderBox>
      <span onClick={clickTitle.bind(this)}>{title || '账号资料编辑'}</span>
      <Button>保存最新修改</Button>
    </HeaderBox>
  )
}
