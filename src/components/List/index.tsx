import React, { useEffect, createRef } from 'react';
import { Box } from 'uikit';
import ReactLoading from "react-loading";
import styled from 'styled-components';

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
              <ReactLoading type={'cylon'} color="#fff" />
            </LoadingWrapper>
          ) : (
            <NoDataWrapper>已经到底了～</NoDataWrapper>
          )
        }
      </div>
    )
  }
}