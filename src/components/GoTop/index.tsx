import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit';
import { Icon } from 'components';
import { isApp } from 'utils/client';

const ContentBox = styled(Box)`
  .show {
    opacity: 1;
    cursor: pointer;
  }
`;

const TopBox = styled(Box)`
  opacity: 0;
  position: fixed;
  right: 5%;
  bottom: 12%;
  cursor: auto;
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
    // startX = e.changedTouches[0].pageX;
    // startY = e.changedTouches[0].pageY;
  };
  const touchend = e => {
    let Top = document.documentElement.scrollTop;
    // scrollTop = Top;

    if (Top < topValue || Top === 0) {
      console.log(topValue - Top, '向上');
      setIsShow(false);
    } else {
      console.log(topValue - Top, '向下');
      setIsShow(true);
    }
    setTimeout(() => {
      topValue = Top;
    }, 10);
    // e.preventDefault();
    // moveEndX = e.changedTouches[0].pageX;
    // moveEndY = e.changedTouches[0].pageY;
    // let X = moveEndX - startX;
    // let Y = moveEndY - startY;
    // if (Math.abs(Y) > Math.abs(X) && Y > 0) {
    //   scrollTop = Y;
    //   console.log(scrollTop - topValue);
    //   if (scrollTop < topValue - 10) {
    //     setIsShow(false);
    //   } else {
    //     setIsShow(true);
    //   }
    //   setTimeout(() => {
    //     topValue = scrollTop;
    //   }, 0);
    // }
  };
  const Top = () => {
    if (IsShow) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setIsShow(false);
    }
  };

  useEffect(() => {
    if (document.documentElement.scrollTop === 0) {
      setIsShow(false);
    }
    window.addEventListener('scroll', bindHandleScroll);
    window.addEventListener('touchmove', e => touchend(e));
    return () => {
      window.removeEventListener('scroll', bindHandleScroll);
      window.removeEventListener('touchmove', touchend);
    };
  }, []);
  const size = 20;
  return (
    <ContentBox>
      <TopBox className={IsShow ? 'show' : ''} onClick={Top}>
        <Flex
          height='100%'
          width='100%'
          justifyContent='center'
          alignItems='center'
        >
          <Icon
            size={size}
            color='white'
            current={IsShow ? 1 : 0}
            name='icon-jiantou'
          />
        </Flex>
      </TopBox>
    </ContentBox>
  );
};
export default Gotop;
