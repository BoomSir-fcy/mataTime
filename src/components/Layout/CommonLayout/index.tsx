import React from 'react';
import { Header } from 'components/Header/header';
import { CommonLayoutWrapper } from './style';



type IProps = {

}

const CommonLayout: React.FC<IProps> = ({ children }) => {
    return (
        <CommonLayoutWrapper>
          <Header></Header>
            { children }
        </CommonLayoutWrapper>
    )
}

export default CommonLayout