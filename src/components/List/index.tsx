import React,{useEffect,createRef} from 'react';
interface Iprops {
  renderList:()=>void;
  marginTop?:number
}
export class List extends React.Component<Iprops>{
  listBox:any
constructor(props:Iprops){
  super(props)
  this.listBox = createRef()
}
defaultProps : {
  marginTop: 0
}
loadList(){
  this.props.renderList()
}
componentDidMount(){
  this.loadList()
  document.addEventListener('scroll', this.scrollRenderHandler.bind(this))
}
componentWillUnmount(){
  document.removeEventListener('scroll',this.scrollRenderHandler.bind(this))
}
scrollRenderHandler(){
  if(!this.listBox.current)return false
  if (window.pageYOffset + window.innerHeight >= this.listBox.current.offsetHeight+this.props.marginTop) {
    this.loadList()
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