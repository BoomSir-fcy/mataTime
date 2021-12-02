import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useTranslation } from 'contexts/Localization'
import { Header, CommonLeftMenu, Affix } from 'components';
import { HotTopic, RecommendPeople, Search, Swap, FooterCopyright } from 'view/Home/right';
import { Header as CenterHeader } from 'view/Home/center'
import { Flex, Box } from 'uikit';
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
  const [screenWid, setScreenWid] = useState<number>(0);
  useEffect(() => {
    const wid = document.body.clientWidth
    setScreenWid(wid)
  }, [])
  return (
    <LayoutMiddleWrapper>
      {
        props.location.pathname !== '/news/praise' ?
          <CenterHeader title={t('newsNotice')}></CenterHeader>
          : null
      }
      <Route path={'/news'} exact render={() => <Redirect to={'/news/me'} push />}></Route>
      <Route path={'/news/me'} render={(props) => {
        return (<NewsMe {...props} />)
      }}></Route>
      <Route path={'/news/comment'} render={(props) => {
        return (<NewsComment {...props} />)
      }}></Route>
      <Route path={'/news/praise'} render={(props) => (
        <NewsPraise></NewsPraise>
      )}></Route>
      <Route path={'/news/notice'} component={NewsNotice}></Route>
    </LayoutMiddleWrapper>

  )
}