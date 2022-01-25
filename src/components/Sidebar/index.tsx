import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { Box } from 'uikit';
import Search from '../SearchInput';
import Swap from './swap';
import HotTopic from './hotTopic';
import RecommendPeople from './recommendPeople';
import FooterCopyright from './footerCopyright';
import styled from 'styled-components';
import { REFRESH_TIME_BURN_PER_CIRCLE } from 'config';
import SearchFilter from 'components/SearchInput/SearchFilter';
import { useLocation } from 'react-router-dom';
import { debounce, throttle } from 'lodash';

const SidebarStyled = styled(Box)`
  position: sticky;
  transition: all 0.2s ease-out;
  top: 0;
  display: none;
  padding-bottom: 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;

enum Direction {
  UP,
  DOWN,
  UNKNOW,
}

const Sidebar = props => {
  const ref = React.useRef<HTMLDivElement | null>();
  const { pathname } = useLocation();

  const [scrollTop, setScrollTop] = useState(0);
  const [position, setPosition] = useState('top');
  const [maxPositionValue, setMaxPositionValue] = useState(0);
  const handleScroll = useCallback(() => {
    const maxTop = ref.current.clientHeight - window.innerHeight;
    if (scrollTop > window.scrollY) {
      setPosition('bottom');
    } else {
      setPosition('top');
    }
    setScrollTop(window.scrollY);
    setMaxPositionValue(maxTop);
  }, [scrollTop, ref.current]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <SidebarStyled
      {...props}
      style={{ [`${position}`]: `-${maxPositionValue}px` }}
      ref={ref}
    >
      {pathname === '/search' ? (
        <SearchFilter mt='15px' mb='15px' />
      ) : (
        <Search mt='15px' mb='15px' />
      )}
      {/* 代办,从这监听搜索,然后参数传给ArticleList,进行搜索 */}
      <Swap />
      <RecommendPeople />
      <HotTopic />
      <FooterCopyright />
    </SidebarStyled>
  );
};

export default Sidebar;
