import React,{ useState, useRef} from 'react';
import styled from "styled-components";
import { Flex ,Box} from 'uikit';
import {Link} from 'react-router-dom'
import menuData from './menuData'
import { Avatar } from 'components/Avatar';

const MenuBox = styled(Flex)`
  flex-direction: column;
  justify-content:space-between;
padding:20px 13px;
width: 200px;
height: calc(100vh - 150px);
background: #191F2D;
border-radius: 10px;
`
const Logo = styled.h2`
width: 175px;
height: 32px;
background-color: red;
// margin-bottom:26px;
`
const ItemLink = styled(Link)`
margin-top:20px;
display: flex;
width: 120px;
height: 40px;
border-radius: 18px;
font-size: 18px;
font-weight: bold;
color: #EAEAEA;
line-height:40px;
`
const Badge= (props:{count:number|string})=>{
let {count} = props
if(count>99){
  count='+99'
}
  return(
    <span style={{
    position: "absolute",
    top:'-5px',
    right:'-20px',
    // width:'25px',
    padding:'0 6px',
    height:'15px',
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
    background: '#EC612B',
    borderRadius: '5px',
    fontWeight:400,
    fontSize:'12px',
  }}>{count}</span>
  )
}
export const User = ()=>{
  return(
    <div>
    </div>
  )
}

export  const MenuList = (props:{menuList:any[]})=>{
  const {menuList} = props
  const [currentIndex ,setCurrentIndex] = useState(0)
  const itemClick  =(index)=>{
    setCurrentIndex(index)
  }
return(
  <>
  {
   menuList.map((item,index)=>{
      return(
        <ItemLink onClick={itemClick.bind(this,index)} to={item.path} key={index} style={{backgroundColor:currentIndex===index?'#232A3D':''}}>
          <div style={{position:'relative'}}>
            {item.badge?<Badge count={0}></Badge>:''}
            <span style={{fontSize:'14px',color:'blue'}}>{item.icon}</span>
          </div>
          <span style={{marginLeft:'20px'}}>{item.title}</span>
        </ItemLink>
      )
    })
  }
  </>
)
}
const UserTitle  = styled.div`
margin:0 12px;
  font-weight:700;
  font-size:18px;
  color:#fff;
  ::after{
    position:relative;
    right:-50px;
    content: "";
    display:inline-block;
    width:0px;
    height:0px;
    border-bottom: 7px solid transparent;
    border-left: 7px solid #fff;
    border-right: 7px solid transparent;
    border-top: 7px solid transparent;
}
`
const UserDesc  = styled.div`
margin:0 12px;
font-size: 16px;
font-weight: 400;
color: #B5B5B5;
`
export  const Menu:React.FC = ()=>{
  return (
    <MenuBox>
      <Box>
        <Logo>logo</Logo>
        <MenuList menuList={menuData}></MenuList>
      </Box>
      <Flex>
        <Avatar src="" scale="sm" />
        <Box>
          <UserTitle>
            OliNe
          </UserTitle>
          <UserDesc>@0x3...d39</UserDesc>
        </Box>
      </Flex>
    </MenuBox>
  )
}