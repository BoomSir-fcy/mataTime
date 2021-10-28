import React, { useState } from 'react'
import styled from "styled-components";
import { Flex, Button } from 'uikit'
export const TabsBox = styled(Flex)`
margin-bottom: 12px;
line-height:60px;
padding-left:16px;
background: #191F2D;
border-radius: 10px;
`
const TableLeftBox = styled(Flex)`
font-size: 14px;
font-weight: 400;
color: #B5B5B5;
& div{
  padding:0 20px;
  cursor:pointer;
}
.leftActive{
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
}
 `
const TableRightBox = styled(Flex)`
font-size: 18px;
font-weight: 400;
color: #fff;
font-weight: bold;
align-items: center;
& button{
  height: 35px;
  margin-right:10px;
  background-color: #4d535f;
}
.rightActive{
  background-color: #4168ED;
}
 `
interface propsType {
  defCurrentLeft?: number
  defCurrentRight?: number
  tabLeftChange?: (item) => void
  tabRightChange?: (item) => void
  tabRightArr: any[]
  tabLeftArr: any[]
}
export const Tabs = (props: propsType) => {
  const { defCurrentLeft, defCurrentRight, tabLeftChange, tabRightChange, tabRightArr, tabLeftArr } = props
  const [currentLeftIndex, setCurrentLeftIndex] = useState(defCurrentLeft || 0)
  const [currentRightIndex, setCurrentRightIndex] = useState(defCurrentRight || 0)
  const leftTabClick = (item, index) => {
    if (index === currentLeftIndex) return
    setCurrentLeftIndex(index)
    tabLeftChange(item)
  }
  const rightTabClick = (item, index) => {
    if (index === currentRightIndex) return
    setCurrentRightIndex(index)
    tabRightChange(item)
  }
  return (
    <TabsBox justifyContent="space-between">
      {tabLeftArr.length > 0 ?
        <TableLeftBox >
          {
            tabLeftArr.map((item, index) => {
              return (
                <div key={item.value} onClick={leftTabClick.bind(this, item, index)} className={currentLeftIndex === index ? 'leftActive' : ''}>
                  {item.label}
                </div>
              )
            })
          }
        </TableLeftBox>
        : ''}
      {tabRightArr.length > 0 ?
        <TableRightBox >
          {
            tabRightArr.map((item, index) => {
              return (
                <Button key={item.value} onClick={rightTabClick.bind(this, item, index)} className={currentRightIndex === index ? 'rightActive' : ''}>
                  {item.label}
                </Button>
              )
            })
          }
        </TableRightBox>
        : ''}
    </TabsBox>
  )
}
Tabs.defaultProps = {
  currentLeft: 0,
  currentRight: 0,
  tabLeftChange: () => { },
  tabRightChange: () => { },
  tabLeftArr: [
    {
      label: '全部',
      value: '1'
    },
    {
      label: '原创',
      value: '2'
    },
    {
      label: '文章',
      value: '3'
    },
  ],
  tabRightArr: [
    {
      label: '全站最新',
      value: '1'
    },
    {
      label: '热门推荐',
      value: '2'
    },
    {
      label: '仅关注',
      value: '3'
    },
  ],
}