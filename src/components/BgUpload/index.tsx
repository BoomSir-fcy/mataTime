import React from 'react'
import styled from 'styled-components';
import { Box, Flex, Text, Button } from 'uikit';

const Background = styled(Flex)`
  width: 100%;
  height:280px;
  background: skyblue;
  border-radius: 10px;
  padding-top:190px;
  justify-content: center;
`

const BgUpload = () => {
  return (
    <Background>
      <Button>上传背景墙</Button>
    </Background>
  )
}

export default BgUpload;