import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { Flex, Box, Button } from 'uikit'

const SwapBox = styled.div`
margin-top:15px;
width: 300px;
height: 436px;
padding: 15px 20px;
background: #191F2D;
// box-shadow: 0px 0px 25px 0px rgba(180, 200, 169, 0.3);
border-radius: 10px;
`
const SwapTit = styled.div`
font-weight: bold;
  font-size:18px;
  color:#fff;
`
const SwapDesc = styled.span`
font-size: 14px;
font-weight: 400;
color: #B5B5B5;
`
const ExchangeBox = styled(Box)`
// padding:10px;
height: 70px;
background: #292D34;
border-radius: 10px;
`
const ExchangeBoxTit = styled(Flex)`
margin:0 15px;
line-height:35px;
`
const ExchangeSelect = styled(ExchangeBoxTit)`
`
const ImgIocn = styled.img`
width: 23px;
height: 25px;
vertical-align:middle;
border-radius: 50%;
`
const BaseTextTit = styled.span`
margin:0 5px;
font-weight: bold;
font-size:14px;
line-height:25px;
color: #FFFFFF;
`
const MiniTitle = styled.span`
font-size: 14px;
color: #FFFFFF;`
const SubmitSwap = styled(Button)`
margin:10px 0;
width: 260px;
height: 40px;
border-radius: 10px;
`
const Clause = styled(MiniTitle)`
color: #B5B5B5;
`
export const Swap: React.FC = () => {
  return (
    <SwapBox>
      <Flex justifyContent="space-between" style={{ marginBottom: '12px' }}>
        <SwapTit>
          兑换Swap
        </SwapTit>
        <SwapDesc>
          匹配至 #DSG
        </SwapDesc>
      </Flex>
      <ExchangeBox>
        <ExchangeBoxTit justifyContent="space-between">
          <span style={{ color: '#fff', fontSize: '14px' }}>
            从
          </span>
          <div>
            <span style={{ color: ' #B5B5B5' }}>
              余额:0
            </span>
            <span style={{ color: ' #7393FF', marginLeft: '16px' }}>
              MAX
            </span>
          </div>
        </ExchangeBoxTit>
        <ExchangeSelect justifyContent="space-between">
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
            到
          </span>
          <div>
            <ImgIocn src="https://pic1.zhimg.com/50/v2-c81d57456b7886c12affc22a699983ff_720w.jpg?source=1940ef5c"></ImgIocn>
            <BaseTextTit>DSG</BaseTextTit>
            <span>icon</span>
          </div>
        </ExchangeSelect>
      </ExchangeBox>
      <div style={{ margin: '10px 0px', color: 'blue' }}>交换</div>
      <ExchangeBox>
        <ExchangeBoxTit justifyContent="space-between">
          <span style={{ color: '#fff', fontSize: '14px' }}>
            从
          </span>
          <div>
            <span style={{ color: ' #B5B5B5' }}>
              余额:0
            </span>
            <span style={{ color: ' #7393FF', marginLeft: '16px' }}>
              MAX
            </span>
          </div>
        </ExchangeBoxTit>
        <ExchangeSelect justifyContent="space-between">
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
            到
          </span>
          <div>
            <ImgIocn src="https://pic1.zhimg.com/50/v2-c81d57456b7886c12affc22a699983ff_720w.jpg?source=1940ef5c"></ImgIocn>
            <BaseTextTit>DSG</BaseTextTit>
            <span style={{ color: 'blue' }}>icon</span>
          </div>
        </ExchangeSelect>
      </ExchangeBox>
      <Flex justifyContent="space-between" style={{ margin: '7px 0' }}>
        <MiniTitle>价格</MiniTitle>
        <div>
          <MiniTitle>
            0.001526 DSG per BUSD
          </MiniTitle>
          <span style={{ color: 'blue' }}>icon</span>
        </div>
      </Flex>
      <div>
        <Flex justifyContent="space-between" style={{ lineHeight: '25px' }}>
          <div>
            <SwapDesc>最小获得量</SwapDesc>
            <span style={{ color: 'blue' }}>icon</span>
          </div>
          <MiniTitle>500 DSG</MiniTitle>
        </Flex>
        <Flex justifyContent="space-between" style={{ lineHeight: '25px' }}>
          <div>
            <SwapDesc>最小获得量</SwapDesc>
            <span style={{ color: 'blue' }}>icon</span>
          </div>
          <MiniTitle>500 DSG</MiniTitle>
        </Flex>
        <Flex justifyContent="space-between" style={{ lineHeight: '25px' }}>
          <div>
            <SwapDesc>最小获得量</SwapDesc>
            <span style={{ color: 'blue' }}>icon</span>
          </div>
          <MiniTitle>500 DSG</MiniTitle>
        </Flex>
      </div>
      <SubmitSwap>兑换</SubmitSwap>
      <Clause>Powered by dsgmetaverse
        <span style={{ color: '#3a5bcc', marginLeft: '20px' }}>服务条款</span>
      </Clause>
    </SwapBox>
  )
}