import React, { useRef } from 'react'
import styled from 'styled-components';
import { Box, Flex, Text, Button } from 'uikit';

const Background = styled(Flex)`
  width: 100%;
  height:280px;
  background: skyblue;
  border-radius: 10px;
  padding-top:190px;
  justify-content: center;
  input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  label {
    display: block;
    width:100%;
    height: 100%;
    line-height:35px;
    padding: 0 20px;
    background:#4168ED;
    border-radius: 10px;
    z-index:99;
  }
`
// style={{ backgroundImage: "url(" + require("../../assets/images/logo/nav-logo.png").default + ")" }}
const BgUpload = () => {
  const onButtonClick = (e) => {
  }
  return (
    <Background>
      <Button style={{ padding: '0px' }}>
        <label htmlFor="bgUpload" id="lab-file">上传背景墙</label>
        <input accept="image/*" type="file" id="bgUpload" onChange={onButtonClick} />
      </Button>
    </Background>
  )
}

export default BgUpload;