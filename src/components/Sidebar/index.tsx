import React from 'react';
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
  top: 0;
`;

const Sidebar = props => {
  React.useEffect(() => {
    const handleScroll = e => {
      console.log(window.scrollY);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SidebarStyled {...props}>
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
