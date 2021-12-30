import React from 'react';
import styled from 'styled-components';
import { Box } from 'uikit';

const TopBox = styled(Box)`
  position: fixed;
  right: 5%;
  bottom: 5%;
  cursor: pointer;
  z-index: 1000;
`;

const Gotop = () => {
  const Top = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <TopBox onClick={Top}>
      <img
        width='50px'
        height='auto'
        src={require('assets/images/common/goTop.png').default}
        alt=''
      />
    </TopBox>
  );
};
export default Gotop;
