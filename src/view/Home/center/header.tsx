import styled from "styled-components";
import {Icon} from  'components'
import {Flex} from 'uikit'
export const HeaderBox = styled(Flex)`
padding-left:16px;
margin-bottom:12px;
background: #191F2D;
border-radius: 10px;
font-size: 18px;
font-weight: bold;
line-height:60px;
color: #FFFFFF;
`
export const Header = (props:{title?:string,clickTitle?:()=>void,[propName:string]:any}) => {
  const {title} = props
  const clickTitle=(e)=>{
    // console.log(e);
  }
  const clickBack=()=>{
    props.history.goBack()
  }
  const back = props.location.pathname!=='/'
  // const back =true
  return (
      <HeaderBox alignItems="center">
       {back && <Icon name="icon-fanhui"  onClick={clickBack} margin="0px 10px 0 0" size={23} color="#fff" style={{cursor: 'pointer'}} />}
        <span onClick={clickTitle.bind(this)}>{title||'首页'}</span>
      </HeaderBox>
  )
}
Header.defaultProps = {
  back:false
}