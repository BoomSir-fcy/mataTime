import React, { useState } from 'react';
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

const SidebarStyled = styled(Box)`
  position: sticky;
  transition: all 0.2s ease-out;
  top: 0;
  display: none;
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
  const [positionTop, setPositionTop] = useState(0);
  const { pathname } = useLocation();

  const HandleScroll = React.useCallback(
    event => {
      const evt = event || window.event;
      const maxTop = ref.current.clientHeight - window.innerHeight;
      const minTop = 0;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
      }
      let e = event.originalEvent || event;
      let deltaY = e.deltaY || e.detail;
      // let top = positionTop + deltaY;
      // top = top > maxTop ? maxTop : top;
      // top = top < minTop ? minTop : top;
      const top = deltaY > 0 ? maxTop : minTop;
      setPositionTop(top);
    },
    [positionTop, setPositionTop],
  );

  React.useEffect(() => {
    document.addEventListener('mousewheel', HandleScroll);
    document.addEventListener('DOMMouseScroll', HandleScroll);
    return () => {
      document.removeEventListener('mousewheel', HandleScroll);
      document.removeEventListener('DOMMouseScroll', HandleScroll);
    };
  }, [HandleScroll]);

  return (
    <SidebarStyled {...props} style={{ top: `-${positionTop}px` }} ref={ref}>
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
