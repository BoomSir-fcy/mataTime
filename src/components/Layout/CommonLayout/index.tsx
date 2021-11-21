import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useTranslation } from 'contexts/Localization'
import { Header, CommonLeftMenu, Affix } from 'components';
import { HotTopic, RecommendPeople, Search, Swap, FooterCopyright } from 'view/Home/right';
import { Header as CenterHeader } from 'view/Home/center'
import menu from './menuData';
import {
  CommonLayoutWrapper,
  LayoutContentWrapper,
  LayoutLeftWrapper,
  LayoutMiddleWrapper,
  LayoutRightWrapper
} from './style';


import NewsMe from 'view/News/Me'
import NewsComment from 'view/News/Comment'
import NewsPraise from 'view/News/Praise'
import NewsNotice from 'view/News/Notice'
type IProps = {

}

export const CommonLayout: React.FC<IProps> = (props: any) => {
  const { t } = useTranslation()
  const { match, location } = props
  return (
    <CommonLayoutWrapper>
      {/* <Header></Header> */}
      <LayoutContentWrapper>

        <LayoutLeftWrapper>
          <Affix offsetTop={100} positionObj={{
            top: '10px',
            left: '300px'
          }}>
            <CommonLeftMenu
              menu={menu[match.url]}
              route={location}
              {...props}
            />
          </Affix>
        </LayoutLeftWrapper>
        <LayoutMiddleWrapper>
          <CenterHeader title={t('newsNotice')}></CenterHeader>
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
          <Affix offsetTop={100} positionObj={{
            top: '10px',
            right: '196px'
          }}>
            <>
              <Search />
              <Swap />
              <RecommendPeople />
              <HotTopic />
              <FooterCopyright />
            </>
          </Affix>
        </LayoutRightWrapper>

      </LayoutContentWrapper>
    </CommonLayoutWrapper>
  )
}