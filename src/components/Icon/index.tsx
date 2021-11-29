import classnames from 'classnames';
interface iocnType {
  size?: number;
  name: string;
  color?: string;
  margin?: string;
  bold?: boolean;
  current?: number;
  [propName: string]: any;
}

export const Icon = (props: iocnType) => {
  const { size, name, color, bold, margin, style = {}, current = 0 } = props;

  return (
    <i
      className={classnames('iconfont ' + name)}
      style={{
        fontSize: size || 20,
        color: color || '#fff',
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
