import styled, { DefaultTheme } from 'styled-components';
import classnames from 'classnames';
import useTheme from 'hooks/useTheme'
import { TextProps } from 'uikit'
import getThemeValue from 'uikit/util/getThemeValue'

export interface iocnType {
  size?: number;
  name: string;
  color?: string;
  margin?: string;
  bold?: boolean;
  current?: number;
  [propName: string]: any;
}

interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};


export const Icon = ({ size, name, color = '#fff', bold, margin, style = {}, current = 0, className, ...props }: iocnType) => {
  const { theme } = useTheme()

  // const { size, name, color = '#fff', bold, margin, style = {}, current = 0, className } = props;
  // if (name === 'icon-jiazai_shuaxin') {
  //   console.log(props)
  // }
  return (
    <i
      className={classnames('iconfont', name, className)}
      style={{
        fontSize: size || 20,
        color: getColor({ color, theme }),
        margin: margin || '0',
        cursor: Boolean(current) ? 'pointer' : '',
        fontWeight: bold ? 'bold' : '',
        ...style
      }}
      {...props}
    />
  );
};

Icon.defaultProps = {
  // onClick: () => {}
};
