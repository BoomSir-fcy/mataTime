import styled from "styled-components";
import { Icon } from 'components'
import { useSelector } from 'react-redux'

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
span{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 500px;
  text-align: center;
}
`
export const Header = (props: { title?: string, back?: boolean, clickTitle?: () => void, align?: string, [propName: string]: any }) => {
  const isDark = useSelector((state: any) => state.appReducer.systemCustom.isDark);

  const { title, back = false, align = 'flex-start' } = props
  const clickTitle = (e) => {
    // console.log(e);
  }
  const clickBack = () => {
    props.history.goBack()
  }
  // const back = props.location.pathname!=='/'
  return (
    <HeaderBox style={{ justifyContent: align, paddingLeft: back && align !== 'center' ? '60px' : null }}>
      {back && <Icon name="icon-fanhui" onClick={clickBack} margin="0px 10px 0 0" size={23} color={isDark ? '#fff' : '#000'} />}
      <span onClick={clickTitle.bind(this)}>{title || '首页'}</span>
    </HeaderBox>
  )
}
Header.defaultProps = {
  back: false
}