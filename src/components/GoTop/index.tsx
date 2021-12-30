import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit';

const TopBox = styled(Box)`
  position: fixed;
  right: 5%;
  bottom: 5%;
  cursor: pointer;
  z-index: 1000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.white};
  background: linear-gradient(90deg, #353535, #080808);
  transition: opacity 0.5s;
`;

const Gotop = () => {
  let scrollTop = 0;
  let topValue = 0;
  const [IsShow, setIsShow] = useState(false);
  // console.log(window.innerHeight);
  // console.log(window.scrollY);

  const getScollTop = () => {
    let scrollTop = 0;
    if (document?.documentElement && document?.documentElement?.scrollTop) {
      scrollTop = document?.documentElement.scrollTop;
    } else if (document?.body) {
      scrollTop = document?.body.scrollTop;
    }
    return scrollTop;
  };
  const bindHandleScroll = event => {
    scrollTop = getScollTop();
    if (scrollTop <= topValue) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
    setTimeout(() => {
      topValue = scrollTop;
    }, 0);
  };

  const Top = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', bindHandleScroll);
    return () => {
      window.removeEventListener('scroll', bindHandleScroll);
    };
  }, []);
  return (
    <TopBox style={{ opacity: IsShow ? '1' : '0' }} onClick={Top}>
      <Flex
        height='100%'
        width='100%'
        justifyContent='center'
        alignItems='center'
      >
        <img
          width='20px'
          height='auto'
          src={require('assets/images/common/goTop.png').default}
          alt=''
        />
      </Flex>
    </TopBox>
  );
};
export default Gotop;
