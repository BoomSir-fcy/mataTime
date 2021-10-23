import React, { useState } from 'react'
import { Box } from 'uikit';
import styled from "styled-components";
import { Desc, Name, Rows, Decoration } from '../Profile/about';
import { mediaQueriesSize } from "uikit/theme/base";
import { Title, Use } from '../LikePeople'

const News = styled(Box)`
  color: #4168ED;
`
const Num = styled(Box)`
  color: #B5B5B5;
`
const AboutWarpper = styled(Box)`
   width: 100%;
   background: ${({ theme }) => theme.colors.backgroundCard};
   border-radius: ${({ theme }) => theme.radii.card};
   ${mediaQueriesSize.padding}
`

export const HotWords = (() => {
  const HotWordState = [
    { news: '#比特币突破10万美元#',num:'50+条内容'},
    { news: '#比特币突破10万美元#',num:'50+条内容'},
    { news: '#比特币突破10万美元#',num:'50+条内容'},
    { news: '#比特币突破10万美元#',num:'50+条内容'},
    { news: '#比特币突破10万美元#',num:'50+条内容'}
  ]
  const [hot, setHot] = useState(HotWordState)
  return (
    <AboutWarpper>
      <Rows justifyContent="space-between">
        <Title>热门话题</Title>
        <Use><a href="#">刷新</a></Use>
      </Rows>
      <>
        {
          hot.map(item => {
            return (
              <div key={item.news}>
                <Rows justifyContent="space-between">
                  <News><a href="#">{item.news}</a></News>
                  <Num>{item.num}</Num>
                </Rows>
              </div>
            )
          })
        }
      </>
    </AboutWarpper>
  )
})