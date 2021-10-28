import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { Header, CommonLeftMenu } from 'components';
import { HotTopic, RecommendPeople, Search, Swap, FooterCopyright } from 'view/Home/right';
import menu from './menuData';
import {
  CommonLayoutWrapper,
  LayoutContentWrapper,
  LayoutLeftWrapper,
  LayoutMiddleWrapper,
  LayoutRightWrapper
} from './style';


import NewsMe  from 'view/News/Me'
import NewsComment  from 'view/News/Comment'
import NewsPraise  from 'view/News/Praise'
import NewsNotice  from 'view/News/Notice'
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
            menu={menu[match.url]}
            route={location}
          />
        </LayoutLeftWrapper>
        <LayoutMiddleWrapper>
          <Route path={'/news'} exact render={() => <Redirect to={'/news/me'} push />}></Route>
          <Route path={'/news/me'} render={(props) => {
            return (<NewsMe {...props} />)
          }}></Route>
          <Route path={'/news/comment'} render={(props) => {
            return (<NewsComment {...props} />)
          }}></Route>
          <Route path={'/news/praise'} component={NewsPraise}></Route>
          <Route path={'/news/notice'} component={NewsNotice}></Route>
        </LayoutMiddleWrapper>
        <LayoutRightWrapper>
          <Search />
          <Swap />
          <RecommendPeople />
          <HotTopic />
          <FooterCopyright />
        </LayoutRightWrapper>
      </LayoutContentWrapper>
    </CommonLayoutWrapper>
  )
}