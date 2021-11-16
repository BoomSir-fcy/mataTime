import styled from "styled-components";
import { Icon } from 'components'
import { Flex, Card } from 'uikit'
export const HeaderBox = styled(Card)`
position: relative;
display: flex;
padding-left:16px;
margin-bottom:12px;
border-radius: 10px;
font-size: 18px;
font-weight: bold;
line-height:60px;
i.icon-fanhui{
  position: absolute;
  left: 17px;
  cursor: pointer;
}
`
export const Header = (props: { title?: string, back?: boolean, clickTitle?: () => void,align?: string ,[propName: string]: any }) => {
  const { title, back = false, align='flex-start' } = props
  const clickTitle = (e) => {
    // console.log(e);
  }
  const clickBack = () => {
    props.history.goBack()
  }
  // const back = props.location.pathname!=='/'
  return (
    <HeaderBox style={{justifyContent:align,paddingLeft:back&&align!=='center'?'60px':null}}>
      {back && <Icon name="icon-fanhui" onClick={clickBack} margin="0px 10px 0 0" size={23} color="#fff"  />}
      <span onClick={clickTitle.bind(this)}>{title || '首页'}</span>
    </HeaderBox>
  )
}
Header.defaultProps = {
  back: false
}