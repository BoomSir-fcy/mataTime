import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import { Header as CenterHeader } from 'view/Home/center';
import { LayoutMiddleWrapper } from './style';

import NewsMe from 'view/News/Me';
import NewsComment from 'view/News/Comment';
import NewsPraise from 'view/News/Praise';
import NewsNotice from 'view/News/Notice';
import { Crumbs } from 'components';

export const CommonLayout: React.FC<any> = (props: any) => {
  const { t } = useTranslation();
  const { location } = props;

  const title =
    location.pathname !== '/notification/notice'
      ? t('newsNotice')
      : t('newsSystem');

  return (
    <LayoutMiddleWrapper>
      {/* <CenterHeader title={title} /> */}
      <Crumbs zIndex={1005} title={title} />
      <Route
        path={'/notification'}
        exact
        render={() => <Redirect to={'/notification/me'} push />}
      />
      <Route
        path={'/notification/me'}
        render={props => {
          return <NewsMe {...props} />;
        }}
      />
      <Route
        path={'/notification/comment'}
        render={props => {
          return <NewsComment {...props} />;
        }}
      />
      <Route path={'/notification/praise'} component={NewsPraise} />
      <Route path={'/notification/notice'} component={NewsNotice} />
    </LayoutMiddleWrapper>
  );
};
