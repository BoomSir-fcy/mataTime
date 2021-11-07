import React,{useState,useEffect} from 'react';
// import styled from 'styled-components';
// import { useImmer } from 'use-immer';
import E from 'wangeditor'
import { Api } from 'apis'
import {Icon} from 'components'
// import { Emoji } from './emoji';
// import { Toolbar } from './toolbar';
import {
  EditorWarpper,
  SendButton,
  TextBox,
  Toolbar
} from './style'
import { toast } from 'react-toastify';
{/* <SendButton>发布</SendButton> */ }
const { BtnMenu } = E

type imgListType = {
  imgList:any[],
  delImgItem:(index)=>void
}
const ImgList=(props:imgListType)=>{
  const [imgList,setImgList] = useState([])
  useEffect(()=>{
    setImgList(props.imgList)
    console.log(props.imgList);
  },[props.imgList])
  const delImgItem =(index)=>{
    const temp = [...imgList]
    temp.splice(index,1)
    setImgList(temp)
    console.log(temp);
    props.delImgItem(temp)
  }
  return (
    <div className="imgList">
        {
          imgList.map((item,index)=>(
            // Array(9).fill(null).map((item,index)=>(
            <div key={index}>
              <Icon cur size={17} name="icon-jian" color="#ec612b" onClick={delImgItem.bind(this, index)}></Icon>
              <img  src={item} alt="" />
            </div>
          ))
        }
    </div>
  )
}
type Iprops = {
  sendArticle: (string, ...args: any[]) => void,
  type: string
}
export class Editor extends React.Component<Iprops> {
  editor: any
  state:{
    imgList:any[]
  }
  constructor(props: Iprops) {
    super(props)
    this.state={
      imgList:[]
    }
  }
  componentDidMount () {
    this.initEditor()
  }
  initEditor () {
    const editor = new E('#toolbar', '#textbox')
    editor.config.placeholder = '分享新鲜事'
    editor.config.height = 500
    // editor.config.showFullScreen = true
    editor.config.showLinkImg = false
    editor.config.menus = [
      'emoticon',
      'image'
    ]
    class InsertAT extends BtnMenu {
      constructor(editor) {
        const $elem = E.$(
          `
          <div class="w-e-menu" data-title="艾特">
            <i class="iconfont icon-aite"></i>
          </div>
          `
        );
        super($elem, editor);
      }
      clickHandler () {
        editor.cmd.do("insertHTML", `<span style="color:blue">@李某某</span>`);
      }
      // 菜单激活状态
      tryChangeActive () {
        this.active(); // 菜单激活
        // this.unActive() // 菜单不激活
      }
    }
    class InsertTopic extends BtnMenu {
      constructor(editor) {
        const $elem = E.$(
          `
          <div class="w-e-menu" data-title="话题">
            <i class="iconfont icon-a-xiaoxi1"></i>
          </div>
          `
        );
        super($elem, editor);
      }
      clickHandler () { 
        // &ZeroWidthSpace;
        editor.cmd.do("insertHTML", `<span class="topic" style="font-size: 16px; color: blue;">#请输入话题#</span><span>&nbsp;</span>`);
      } 
      // 菜单激活状态
      tryChangeActive () {
        this.active(); // 菜单激活
        // this.unActive() // 菜单不激活
      }
    }
    editor.menus.extend("aite", InsertAT);
    editor.menus.extend("topic", InsertTopic);
    editor.config.menuTooltipPosition = 'down'
    editor.config.menus = editor.config.menus.concat('aite', 'topic');
       editor.config.uploadImgMaxLength = 1
      editor.config.customUploadImg =  (resultFiles: any[], insertImgFn)=> {
        if(this.state.imgList.length>=9)return toast.error('最多上传九张')
      const file = resultFiles[0];
      let fr: any = new FileReader();
      // 读取文件
      fr.readAsDataURL(file);
      // 将文件转为base64
      fr.onload = ()=> {
        Api.CommonApi.uploadImg({ dir_name:this.props.type, base64: fr.result }).then(res => {
          // console.log(this.imgList);
          // this.imgList.push(res.data.full_path)
          this.setState({ imgList: [...this.state.imgList,res.data.full_path] })
          
          // const inputEl: any = document.querySelector('#textbox')
          // const lastEl:any = inputEl.lastElementChild
          // let imgBox:any = ''
          // const imgEl:any = document.createElement('img')
          // imgEl.src=res.data.full_path
          // // imgEl.contenteditable = 'false'
          // imgEl.style.cssText=`
          // pointerEvents:none;
          // width:50px;height:50px
          // `
          // if(lastEl.id !== 'imgList'){
          //   imgBox = document.createElement('div')
          //   imgBox.id = 'imgList'
          //   inputEl.appendChild(imgBox)
          // }
          // const imgListBox = document.querySelector('#textbox').lastElementChild
          // console.log(imgListBox);
          // imgListBox.appendChild(imgEl)
        //   if (lastEl.id !== 'imgList') {
        //   }else{
        //     imgBox = lastEl
        //   }
        //   imgBox.appendChild(imgEl)
        //   // insertImgFn(res.data.full_path)
        })
      }
    }
    editor.config.onchange = function (newHtml) {
      // console.log(editor.txt.text())
      let flag = false
    const box:any =  document.createElement('div')
    box.innerHTML = editor.txt.html()
   const topicEles = box.getElementsByClassName('topic')
   Array().forEach.call(topicEles,(item,index)=>{
     const str = item.innerText
    if(str.slice(0, 1)===' '){
      const regExp = new RegExp(' <span class="topic" style="font-size: 16px; color: blue;">'+(str)+'</span>','g')
      box.innerHTML = box.innerHTML.replace(regExp,'<span> </span><span class="topic" style="font-size: 16px; color: blue;">'+(str)+'</span>')
      flag = true
    }
    if(str.slice(-1)===' '){
      const regExp = new RegExp('<span class="topic" style="font-size: 16px; color: blue;">'+(str)+'</span> ','g')
      box.innerHTML = box.innerHTML.replace(regExp,'<span class="topic" style="font-size: 16px; color: blue;">'+(str)+'</span><span> </span>')
      flag = true
    }
     if(str.slice(0, 1)!=='#'||str.slice(-1)!=='#'){
       if(!flag){

       }
       const regExp = new RegExp('<span class="topic" style="font-size: 16px; color: blue;">'+(str)+'</span>','g')
      box.innerHTML = box.innerHTML.replace(regExp,'')
      flag = true
      //  console.log(box.innerHTML.replace(`<span style="color:blue" class="topic">${str}</span>`,''));
     }
    // console.dir(item.textContent.replace(/#/g,''));
  })
  if(flag){
    editor.txt.html(box.innerHTML)
    flag = false
  }
  console.log('hah');
  
    };
    editor.create()
    this.editor = editor
  }
  componentWillUnmount () {
    this.editor.destroy();
  }
  protected restInput () {
    this.editor.txt.clear()
    this.setState({ imgList: [] })
  }
  sendArticle () {
    const box =  document.createElement('div')
    box.innerHTML = this.editor.txt.html()
   const topicEles = box.getElementsByClassName('topic')
   Array().forEach.call(topicEles,(item)=>{
     console.dir(item.textContent.replace(/#/g,''));
   })
    // this.props.sendArticle(this.editor.txt.html(), this.restInput.bind(this),this.state.imgList.join(','))
  }
  delImgItem(imgList){
    this.setState({ imgList})
  }
  render () {
    return (
      <EditorWarpper>
        <TextBox>
          <div id="textbox"></div>
          <ImgList delImgItem={this.delImgItem.bind(this)} imgList={this.state.imgList}></ImgList>
        </TextBox>
        <Toolbar justifyContent="space-between" alignItems="center">
          <div id="toolbar"></div>
          <SendButton onClick={this.sendArticle.bind(this)}>发表</SendButton>
        </Toolbar>
      </EditorWarpper>
    )
  }
}