import classnames from 'classnames';
export const Icon=(props:{size?:number ,name:string,color?:string,margin?:string}) =>{
  const {size,name,color,margin} = props
  return (
    <i className={classnames("iconfont "+name)} style={{fontSize:(size||20),color:color||'#fff',margin:margin||'0'}}></i>
  )
}