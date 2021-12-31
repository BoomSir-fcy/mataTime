import React from 'react';
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

const Sidebar = props => {
  const ref = React.useRef<HTMLDivElement | null>();
  const [state, setState] = useImmer({
    scroll: 10,
    top: ''
  });
  const { pathname } = useLocation()

  const HandleScroll = React.useCallback(
    event => {
      const evt = event || window.event;
      const top = ref.current.clientHeight - window.innerHeight;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
      }
      let e = event.originalEvent || event;
      let deltaY = e.deltaY || e.detail;
      if (deltaY < 0 && state.scroll <= 10) return;
      if (top <= state.scroll) return;
      setState(p => {
        p.scroll = state.scroll <= window.scrollY ? window.scrollY : 0;
        p.top =
          state.scroll <= window.scrollY
            ? `-${ref.current.clientHeight - window.innerHeight}px`
            : '0';
      });
    },
    [state.scroll]
  );

  React.useEffect(() => {
    document.addEventListener('mousewheel', HandleScroll);
    return () => {
      document.removeEventListener('mousewheel', HandleScroll);
    };
  }, [state.scroll]);

  return (
    <SidebarStyled {...props} style={{ top: state.top }} ref={ref}>
      {
        pathname === '/search'
          ?
          <SearchFilter mt="15px" mb="15px" />
          :
          <Search mt="15px" mb="15px" />
      }
      {/* 代办,从这监听搜索,然后参数传给ArticleList,进行搜索 */}
      <Swap />
      <RecommendPeople />
      <HotTopic />
      <FooterCopyright />
    </SidebarStyled>
  );
};

export default Sidebar;
