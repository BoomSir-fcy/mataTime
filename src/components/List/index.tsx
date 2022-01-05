import React, { createRef } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Box, Image, Empty } from 'uikit';

export const LoadingWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const NoDataWrapper = styled(Box)`
  width: 100%;
  /* height: 50px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textTips};
`;

// 加载类型 1: 初始化加载, 2: 滚动加载, 3: TODO: 下拉刷新
type LoadType = 1 | 2 | 3

interface Iprops {
  renderList: (type?: LoadType) => void;
  marginTop?: number;
  loading?: boolean;
  appReducer: any;
  onRef?: any;
}

class ListComponents extends React.Component<Iprops> {
  listBox: any;
  isDark: boolean;

  constructor(props: Iprops) {
    super(props);
    this.listBox = createRef();
  }

  defaultProps: {
    marginTop: 0;
    loading: true;
  };

  loadList(type?: LoadType) {
    this.props.renderList(type);
  }

  componentDidMount() {
    const { systemCustom } = this.props.appReducer;
    this.setState(
      {
        isDark: systemCustom.isDark
      },
      () => {
        this.loadList(1);
      }
    );
    // this.props?.onRef(this.props);
    document.addEventListener('scroll', this.scrollRenderHandler.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollRenderHandler.bind(this));
  }

  scrollRenderHandler() {
    if (!this.listBox.current) return false;
    if (
      window.pageYOffset + window.innerHeight + 300 >=
      this.listBox.current.offsetHeight + this.listBox.current.offsetTop
    ) {
      this.loadList(2);
    }
  }

  render() {
    const { systemCustom } = this.props.appReducer;
    return (
      <Box ref={this.listBox} className="list-container">
        {this.props.children}
        {this.props.loading ? (
          <LoadingWrapper>
            <ReactLoading
              type={'cylon'}
              color={systemCustom.isDark ? '#fff' : '#4168ED'}
            />
          </LoadingWrapper>
        ) : (
          <NoDataWrapper>
            {/* {systemCustom.languange.id === 2 ? '已经到底了～' : "It's over～"} */}
            {/* It's at the bottom～ */}
            {/* <Image mt="50%" src="/images/no-order.svg" height={201.6} width={153.95} /> */}
            {
              Array.isArray(this.props.children) && this.props.children?.length === 0 && (
                <Empty />
              )
            }
          </NoDataWrapper>
        )}
      </Box>
    );
  }
}

const ListStateToProps = state => {
  return {
    appReducer: state.appReducer
  };
};

const ListDispatchToProps = (dispatch, props) => {
  return {};
};

export const List = connect(
  ListStateToProps,
  ListDispatchToProps
)(ListComponents);
