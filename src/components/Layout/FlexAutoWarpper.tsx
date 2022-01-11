import React, { useEffect, useState, ReactElement, StrictMode } from 'react';
import styled from 'styled-components';

interface State {
  hasError: boolean;
  children?: any;
}
class ErrorBoundary extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      hasError: true,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) return children?.[0] || null;
    // Normally, just render children
    return <>{children}</>;
  }
}

interface FlexAutoWarpperProps {
  lineMax?: number;
  flatNum?: number;
}

const FlexAutoWarpper: React.FC<FlexAutoWarpperProps> = ({
  children,
  lineMax = 6,
  flatNum = 3,
}) => {
  const [childrenLength, setChildrenLength] = useState(0);
  const [autoDom, setAutoDom] = useState(null);

  /**
   *
   * @dev 弥补flex布局缺陷
   * flex 换行是会 依据@justifyContent 进行布局
   * 我希望它换的时候从左向右一次对齐第一排排列
   * 所有就出现了这个组件
   * 初步测试成功，暂时没遇到太大问题 能满足需求
   */
  useEffect(() => {
    try {
      if (!children || !(children as any).length) return;
      if (childrenLength === (children as any)?.length) return;
      if (childrenLength !== (children as any).length) {
        setChildrenLength((children as any).length);
      }
      const realChildren = (children as any)?.flat(flatNum);
      const len = realChildren.length;
      const sliceLen = Math.min(lineMax, realChildren.length - 1);
      const InvisibleDoms = realChildren
        ?.slice(len - sliceLen, len)
        .map(item => {
          if (!item) return item;
          return {
            ...item,
            props: {
              ...item?.props,
              style: {
                ...item?.props?.style,
                visibility: 'hidden',
                height: 0,
                minHight: 0,
                maxHeight: 0,
                marginTop: 0,
                marginBottom: 0,
                paddingBottom: 0,
                paddingTop: 0,
              },
            },
          };
        });
      setAutoDom(InvisibleDoms);
    } catch (error) {
      setAutoDom(null);
    }
  }, [children, childrenLength, lineMax, flatNum, setAutoDom]);

  return (
    <>
      <ErrorBoundary>
        {children}
        {autoDom}
      </ErrorBoundary>
    </>
  );
};

export default FlexAutoWarpper;
