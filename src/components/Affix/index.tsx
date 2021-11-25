import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
type IProps = {
  offsetTop?: number,
  children: React.ReactElement,
  // 可以用来设置定位后的样式,top和left这些
  positionObj: any,
  onChange: (data) => void
}
const AffixBox = styled.div`
height:100vh;
padding-bottom:30px;
overflow-y: auto;
&::-webkit-scrollbar {
  display: none;
}
`
export const Affix = (props: IProps) => {
  const { children, offsetTop, positionObj, onChange } = props
  const [windowOffsetTop, setWindowOffsetTop] = useState(0)
  useEffect(() => {
    const fn = () => {
      setWindowOffsetTop(window.pageYOffset)
      onChange(windowOffsetTop)
    }
    document.addEventListener('scroll', fn)
    return () => document.removeEventListener('scroll', fn)
  })
  // overflowY:windowOffsetTop>offsetTop ?'auto':'visible',
return (
  <AffixBox style={{
    position: windowOffsetTop>offsetTop ?'fixed':'static',
    ...positionObj
  }}>
   {children}
  </AffixBox>
)
}

Affix.defaultProps = {
  offsetTop: 0,
  positionObj: {},
  onChange: () => { }
}
