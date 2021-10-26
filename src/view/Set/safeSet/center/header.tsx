import styled from "styled-components";
import { Box } from 'uikit';

export const HeaderBox = styled(Box)`
width: 670px;
padding: 21px 16px;
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
      <span onClick={clickTitle.bind(this)}>{title || '设置'}</span>
    </HeaderBox>
  )
}
