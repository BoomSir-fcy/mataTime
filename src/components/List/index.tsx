import React, { useEffect, createRef } from 'react';
import { Box } from 'uikit';
import ReactLoading from "react-loading";
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components';

import { store } from 'store';

export const LoadingWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const NoDataWrapper = styled(Box)`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #B5B5B5;
`

interface Iprops {
  renderList: () => void;
  marginTop?: number;
  loading?: boolean;
}
export class List extends React.Component<Iprops>{
  listBox: any
  isDark: boolean;
  constructor(props: Iprops) {
    super(props)
    this.listBox = createRef()
  }
  defaultProps: {
    marginTop: 0,
    loading: true
  }
  loadList() {
    this.props.renderList()
  }
  componentDidMount() {
    this.setState({
      isDark: store.getState().appReducer.systemCustom.isDark
    })
    this.loadList()
    document.addEventListener('scroll', this.scrollRenderHandler.bind(this))
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollRenderHandler.bind(this))
  }
  scrollRenderHandler() {
    if (!this.listBox.current) return false
    if (window.pageYOffset + window.innerHeight >= this.listBox.current.offsetHeight + this.props.marginTop) {
      this.loadList()
    }
  }
  render() {
    return (
      <div ref={this.listBox} className="list-container">
        {this.props.children}
        {
          this.props.loading ? (
            <LoadingWrapper>
              <ReactLoading type={'cylon'} color={store.getState().appReducer.systemCustom.isDark ? '#fff' : '#4168ED'} />
            </LoadingWrapper>
          ) : (
            <NoDataWrapper>{store.getState().appReducer.systemCustom.languange.id === 1 ? "It's over～" : '已经到底了～'}</NoDataWrapper>
          )
        }
      </div>
    )
  }
}