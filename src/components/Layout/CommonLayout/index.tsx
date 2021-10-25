import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { Header, CommonLeftMenu } from 'components';
import { HotTopic, RecommendPeople } from 'view/Home/right';
import menu from './menuData';
import {
  CommonLayoutWrapper,
  LayoutContentWrapper,
  LayoutLeftWrapper,
  LayoutMiddleWrapper,
  LayoutRightWrapper
} from './style';


const NewsMe = React.lazy(() => import('view/News/Me'));
const NewsComment = React.lazy(() => import('view/News/Comment'));
const NewsPraise = React.lazy(() => import('view/News/Praise'));
const NewsChat = React.lazy(() => import('view/News/Chat'));
const NewsNotice = React.lazy(() => import('view/News/Notice'));
type IProps = {

}

export const CommonLayout: React.FC<IProps> = (props: any) => {
  console.log(props)
  const { match, location } = props
  return (
    <CommonLayoutWrapper>
      <Header></Header>
      <LayoutContentWrapper>
        <LayoutLeftWrapper>
          <CommonLeftMenu 
            logo={
              <h2>消息</h2>
            }
            menu={menu[match.url]}
            route={location}
           />
        </LayoutLeftWrapper>
        <LayoutMiddleWrapper>
          <Route path={'/news/me'} component={NewsMe}></Route>
          <Route path={'/news/comment'} component={NewsComment}></Route>
          <Route path={'/news/praise'} component={NewsPraise}></Route>
          <Route path={'/news/chat'} component={NewsChat}></Route>
          <Route path={'/news/notice'} component={NewsNotice}></Route>
        </LayoutMiddleWrapper>
        <LayoutRightWrapper>
          <RecommendPeople />
          <HotTopic />
        </LayoutRightWrapper>
      </LayoutContentWrapper>
    </CommonLayoutWrapper>
  )
}