import styled from 'styled-components';
import { Icon } from 'components';
import { Flex, Card } from 'uikit';
import { useSelector } from 'react-redux';
import { mediaQueriesSize } from 'uikit/theme/base';

export const HeaderBox = styled(Card)`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
  i.icon-fanhui {
    position: absolute;
    left: 17px;
    cursor: pointer;
  }
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

export const Header = (props: {
  title?: string;
  back?: boolean;
  clickTitle?: () => void;
  align?: string;
  [propName: string]: any;
}) => {
  const isDark = useSelector(
    (state: any) => state.appReducer.systemCustom.isDark
  );

  const { title, back = false, align } = props;
  /**
   *
   * @review
   * @bug
   * props 参数和当前命名重复
   */
  const clickTitle = e => {
    // console.debug(e);
  };
  const clickBack = () => {
    props.history.goBack();
  };
  // const back = props.location.pathname!=='/'

  return (
    <HeaderBox
      isBoxShadow
      style={{
        justifyContent: align || 'flex-start',
        paddingLeft: back && align !== 'center' ? '60px' : null
      }}
    >
      {/* TODO: color use theme */}
      {back && (
        <Icon
          name='icon-fanhui'
          onClick={clickBack}
          margin='0px 10px 0 0'
          size={23}
          color={isDark ? '#fff' : '#000'}
        />
      )}
      <span onClick={clickTitle.bind(this)}>{title || '首页'}</span>
    </HeaderBox>
  );
};
Header.defaultProps = {
  back: false
};
