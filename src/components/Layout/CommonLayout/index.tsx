import React from 'react';
import { Header } from 'components';
import { CommonLayoutWrapper } from './style';



type IProps = {

}

export const CommonLayout: React.FC<IProps> = ({ children }) => {
    return (
        <CommonLayoutWrapper>
          <Header></Header>
            { children }
        </CommonLayoutWrapper>
    )
}