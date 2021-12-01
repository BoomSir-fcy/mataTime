import { Box } from 'uikit';
import Search from './search';
import Swap from './swap';
import HotTopic from './hotTopic';
import RecommendPeople from './recommendPeople';
import FooterCopyright from './footerCopyright';

const Sidebar = () => {
  return (
    <Box>
      <Search />
      {/* 代办,从这监听搜索,然后参数传给ArticleList,进行搜索 */}
      <Swap />
      <RecommendPeople />
      <HotTopic/>
      <FooterCopyright />
    </Box>
  )
}

export default Sidebar
