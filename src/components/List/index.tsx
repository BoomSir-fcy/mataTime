import React,{useEffect,createRef} from 'react';
interface Iprops {
  renderList:()=>void;
}
export class List extends React.Component<Iprops>{
  listBox:any
constructor(props:Iprops){
  super(props)
  this.listBox = createRef()
}
componentDidMount(){
  this.props.renderList()
  document.addEventListener('scroll', this.scrollRenderHandler.bind(this))
}
componentWillUnmount(){
  document.removeEventListener('scroll',this.scrollRenderHandler.bind(this))
}
scrollRenderHandler(){
  if (window.pageYOffset + window.innerHeight >= this.listBox.current.offsetHeight+410) {
  this.props.renderList()
}
}
render(){
  return (
      <div ref={this.listBox} className="list-container">
        {this.props.children}
      </div>
  )
}
}