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
  top: -388px;
`

const Sidebar = () => {
  return (
    <SidebarStyled>
      <Search />
      {/* 代办,从这监听搜索,然后参数传给ArticleList,进行搜索 */}
      <Swap />
      <RecommendPeople />
      <HotTopic />
      <FooterCopyright />
    </SidebarStyled>
  )
}

export default Sidebar
