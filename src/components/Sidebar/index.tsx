import React from 'react';
import { useImmer } from 'use-immer';
import { Box } from 'uikit';
import Search from './search';
import Swap from './swap';
import HotTopic from './hotTopic';
import RecommendPeople from './recommendPeople';
import FooterCopyright from './footerCopyright';
import styled from 'styled-components';

// TODO: js 判断 滚动
const SidebarStyled = styled(Box)`
  position: sticky;
  transition: all 0.2s ease-out;
  top: 0;
`;

const Sidebar = props => {
  const ref = React.useRef<HTMLDivElement | null>();
  const [state, setState] = useImmer({
    scroll: 0,
    top: ''
  });

  React.useEffect(() => {
    const handleScroll = () => {
      setState(p => {
        p.scroll = window.scrollY;
        p.top =
          state.scroll <= window.scrollY
            ? `-${ref.current.clientHeight - window.innerHeight}px`
            : '0';
      });
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [state.scroll]);

  return (
    <SidebarStyled {...props} style={{ top: state.top }} ref={ref}>
      <Search />
      {/* 代办,从这监听搜索,然后参数传给ArticleList,进行搜索 */}
      <Swap />
      <RecommendPeople />
      <HotTopic />
      <FooterCopyright />
    </SidebarStyled>
  );
};

export default Sidebar;
