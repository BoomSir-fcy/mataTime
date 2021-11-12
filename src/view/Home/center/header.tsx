import styled from "styled-components";
import { Icon } from 'components'
import { Flex, Card } from 'uikit'
export const HeaderBox = styled(Card)`
padding-left:16px;
margin-bottom:12px;
border-radius: 10px;
font-size: 18px;
font-weight: bold;
line-height:60px;
`
export const Header = (props: { title?: string, back?: boolean, clickTitle?: () => void, [propName: string]: any }) => {
  const { title, back = false } = props
  const clickTitle = (e) => {
    // console.log(e);
  }
  const clickBack = () => {
    props.history.goBack()
  }
  // const back = props.location.pathname!=='/'
  return (
    <HeaderBox>
      {back && <Icon name="icon-fanhui" onClick={clickBack} margin="0px 10px 0 0" size={23} color="#fff" style={{ cursor: 'pointer' }} />}
      <span onClick={clickTitle.bind(this)}>{title || '首页'}</span>
    </HeaderBox>
  )
}
Header.defaultProps = {
  back: false
}