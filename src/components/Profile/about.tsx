import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '..';
import { Box, Flex, Text } from 'uikit';
import { mediaQueriesSize } from "uikit/theme/base";

import { Certification } from './certification';

export const AboutWarpper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
`

export const Desc = styled(Flex)`
  flex: 1;
  flex-direction: column;
  ${mediaQueriesSize.marginl}
`
export const Rows = styled(Flex)`
  width: 100%;
  align-items: center;
  ${mediaQueriesSize.marginbmd}
`

export const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: bold;
  ${mediaQueriesSize.marginbmd}
`

export const Decoration = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`

const Value = styled(Text)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.text};
  ${mediaQueriesSize.marginlmd}
`

const FaceRows = styled(Flex)`
  justify-content: space-between;
  ${mediaQueriesSize.margint}
`

const Links = styled(Flex)`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  ::after {
    content: "";
    width: 0;
    height: 0;
    margin-top: 5px;
    border-left: 5px solid ${({ theme }) => theme.colors.text};
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    ${mediaQueriesSize.marginl}
  }
`

export const About = (() => {
  // const editPeople = () => {
  //   console.log('编辑')
  // } 
  return (
    <AboutWarpper>
      <Flex>
        <Link to="/edit">
          <Avatar src="" scale="ld"/>
        </Link>
        <Desc>
          <Name>Baby fuck me</Name>
          <Rows>
            <Certification />
            <Decoration>@0x32...9239</Decoration>
          </Rows>
          <Rows justifyContent="space-between">
            <Decoration>粉丝 <Value>10</Value></Decoration>
            <Decoration>关注 <Value>10</Value></Decoration>
          </Rows>
        </Desc>
      </Flex>
      <FaceRows>
        <Links as={Link} to="/">今日点赞数</Links>
        <Links as={Link} to="/">今日新增粉丝</Links>
      </FaceRows>
    </AboutWarpper>
  )
})