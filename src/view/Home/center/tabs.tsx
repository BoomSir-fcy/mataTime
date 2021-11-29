import React, { useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'contexts/Localization'
import { Flex, Button, Card } from 'uikit'
export const TabsBox = styled.div`
border-top: 1px solid #3A4459;
border-bottom: 1px solid #3A4459;
  margin-bottom: 12px;
  line-height:60px;
  padding-left:16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TableLeftBox = styled(Flex)`
font-size: 14px;
font-weight: 400;
color: ${({ theme }) => theme.isDark ? '#B5B5B5' : '#7A83A0'};
& div{
  padding:0 20px;
  cursor:pointer;
}
.leftActive{
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#000000'};
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
  // background-color: #4d535f;
}
.rightActive{
  // background-color: #4168ED;
}
 `
interface propsType {
  defCurrentLeft?: number
  defCurrentRight?: number
  // tabLeftChange?: (item) => void
  // tabRightChange?: (item) => void
  tabsChange?: (item) => void
  tabRightArr?: any[]
  tabLeftArr?: any[]
}
export const Tabs = (props: propsType) => {
  const { t } = useTranslation()
  const { defCurrentLeft, defCurrentRight, tabsChange, tabRightArr = [], tabLeftArr = [
    {
      label: t('homeTabAll'),
      value: '1',
      paramsName:'attention'
    },
    {
      label: t('homeTabLatest'),
      value: '1',
      paramsName:'attention'
    },
    {
      label: t('homeTabFocus'),
      value: '2',
      paramsName:'attention'
    }
  ] } = props
  const [currentLeftIndex, setCurrentLeftIndex] = useState(defCurrentLeft || 0)
  const [currentRightIndex, setCurrentRightIndex] = useState(defCurrentRight || 0)
  const leftTabClick = (item, index) => {
    // if (index === currentLeftIndex) return
    setCurrentLeftIndex(index)
    tabsChange(item)
  }
  const rightTabClick = (item, index) => {
    // if (index === currentRightIndex) return
    setCurrentRightIndex(index)
    tabsChange(item)
  }
  return (
    <TabsBox>
      {tabLeftArr.length > 0 ?
        <TableLeftBox >
          {
            tabLeftArr.map((item, index) => {
              return (
                <div key={index} onClick={leftTabClick.bind(this, item, index)} className={currentLeftIndex === index ? 'leftActive' : ''}>
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
                <Button  key={item.value} onClick={rightTabClick.bind(this, item, index)} className={currentRightIndex === index ? 'rightActive' : ''}>
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
  // tabLeftChange: () => { },
  // tabRightChange: () => { },
  tabsChange: () => { }
}