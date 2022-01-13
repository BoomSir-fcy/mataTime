import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit';
import { Icon } from 'components';

const TopBox = styled(Box)`
  position: fixed;
  right: 5%;
  bottom: 12%;
  cursor: pointer;
  z-index: 1000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.gradients.buttonBg};
  transition: opacity 0.5s;
`;

const Gotop = () => {
  let scrollTop = 0;
  let topValue = 0;
  let startX = 0;
  let startY = 0;
  let moveEndX = 0;
  let moveEndY = 0;
  const [IsShow, setIsShow] = useState(false);

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

  const touchstart = e => {
    e.preventDefault();
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  };
  const touchmove = e => {
    e.preventDefault();

    moveEndX = e.changedTouches[0].pageX;
    moveEndY = e.changedTouches[0].pageY;
    let X = moveEndX - startX;
    let Y = moveEndY - startY;
    if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      scrollTop = Y;
      if (scrollTop <= topValue) {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
      setTimeout(() => {
        topValue = scrollTop;
      }, 0);
    }
  };
  const Top = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', bindHandleScroll);
    window.addEventListener('touchstart', e => touchstart(e));
    window.addEventListener('touchmove', e => touchmove(e));
    return () => {
      window.removeEventListener('scroll', bindHandleScroll);
      window.removeEventListener('touchstart', touchstart);
      window.removeEventListener('touchmove', touchmove);
    };
  }, []);
  const size = 20;
  return (
    <TopBox style={{ opacity: IsShow ? '1' : '0' }} onClick={Top}>
      <Flex
        height='100%'
        width='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Icon size={size} color='white' current={1} name='icon-jiantou' />
      </Flex>
    </TopBox>
  );
};
export default Gotop;
