import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Text } from 'uikit';
import { mediaQueriesSize } from "uikit/theme/base";

const AboutWarpper = styled(Box)`
  width: 210px;
  height:790px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
`
const Back = styled(Text)`
  color: #fff;
  font-weight:bold;
`
const SideBar = () => {
  return (
    <div>
      <AboutWarpper>
      <Link to="/">
        <Back>返回</Back>
      </Link>
      <div>
        导航菜单
      </div>
    </AboutWarpper>
    </div>
  )
}

export default SideBar;