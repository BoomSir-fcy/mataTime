import classnames from 'classnames';
interface iocnType {
  size?:number ;
  name:string;
  color?:string;
  margin?:string;
  onClick?:()=>void;
  cur?:boolean;
  [propName:string]:any;
}
export const Icon=(props:iocnType) =>{
  const {size,name,color,margin,style={},cur,onClick} = props
  return (
    <i className={classnames("iconfont "+name)} onClick={onClick.bind(this)} style={{fontSize:(size||20),color:color||'#fff',margin:margin||'0',cursor:cur?'pointer':'',...style}}></i>
  )
}
Icon.defaultProps = {
  onClick:()=>{}
}