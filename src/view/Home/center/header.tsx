import styled from "styled-components";

export const HeaderBox = styled.div`
padding-left:16px;
width: 670px;
margin-bottom:12px;
background: #191F2D;
border-radius: 10px;
font-size: 18px;
font-weight: bold;
line-height:60px;
color: #FFFFFF;
`
export const Header = (props:{title:string,clickTitle?:()=>void}) => {
  const {title} = props
  const clickTitle=(e)=>{
    console.log(e);
    
  }
  return (
      <HeaderBox>
        <span onClick={clickTitle.bind(this)}>{title||'首页'}</span>
      </HeaderBox>
  )
}
