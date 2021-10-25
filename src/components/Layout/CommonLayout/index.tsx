import React from 'react';
import { Header, CommonLeftMenu } from 'components';
import { HotTopic, RecommendPeople } from 'view/Home/right';
import {
  NewsMenuData
} from './menuData';
import {
  CommonLayoutWrapper,
  LayoutContentWrapper,
  LayoutLeftWrapper,
  LayoutMiddleWrapper,
  LayoutRightWrapper
} from './style';



type IProps = {

}

export const CommonLayout: React.FC<IProps> = ({ children }) => {

  return (
    <CommonLayoutWrapper>
      <Header></Header>
      <LayoutContentWrapper>
        <LayoutLeftWrapper>
          <CommonLeftMenu 
            logo={
              <h2>消息</h2>
            }
            menu={NewsMenuData}
           />
        </LayoutLeftWrapper>
        <LayoutMiddleWrapper>
          {children}
        </LayoutMiddleWrapper>
        <LayoutRightWrapper>
          <RecommendPeople />
          <HotTopic />
        </LayoutRightWrapper>
      </LayoutContentWrapper>
    </CommonLayoutWrapper>
  )
}