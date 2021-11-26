import classnames from 'classnames';
interface iocnType {
  size?: number;
  name: string;
  color?: string;
  margin?: string;
  bold?: boolean;
  // onClick?: () => void;
  cur?: boolean;
  [propName: string]: any;
}
export const Icon = (props: iocnType) => {
  const { size, name, color, bold, margin, style = {}, cur } = props;
  const cursor = cur ? 1 : 0;

  return (
    <i
      className={classnames('iconfont ' + name)}
      // onClick={onClick.bind(this)}
      style={{
        fontSize: size || 20,
        color: color || '#fff',
        margin: margin || '0',
        cursor: Boolean(cur) ? 'pointer' : '',
        fontWeight: bold ? 'bold' : '',
        ...style
      }}
      {...props}
    ></i>
  );
};

Icon.defaultProps = {
  // onClick: () => {}
};
