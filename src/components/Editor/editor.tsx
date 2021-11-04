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
        editor.cmd.do("insertHTML", `<span contenteditable="false">&nbsp;<span style="color:blue">@李某某</span>&nbsp;</span>`);
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
        editor.cmd.do("insertHTML", `<span contenteditable="false">&nbsp;<span style="color:blue">#瓜娃子#</span>&nbsp;</span>`);
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
    // editor.config.uploadImgShowBase64 = true
    //   editor.config.uploadImgServer = 'http://yapi.qgx.io/mock/20/v1/upload/img'
    //   editor.config.uploadImgHeaders  = {
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzYyNjc0NjUsImlzcyI6ImRpbm9zYXVyMzM4OSIsIm5iZiI6MTYzNTY2MjY2NSwidWlkIjoiMTA1MjI4OTcyMCIsImFkZHJlc3MiOiIweDZmMzBhZDZjQTE2NjRkZkQwYkIxRjYzOWQ5RmM4MDcxNDlDQzEzQWEifQ.ZrZBJyXo2nb80zpPI3J8TEPTVsbqaFFj24UfnZLNEUY'
    // }
    // editor.config.uploadImgParams = {
    //   dir_name:'post'
    // }
    // editor.config.uploadFileName = ''
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
      console.log(editor.txt.text())
    };
    editor.create()
    this.editor = editor
  }
  componentWillUnmount () {
    this.editor.destroy();
  }
  protected restInput () {
    this.editor.txt.clear()
  }
  sendArticle () {
    this.props.sendArticle(this.editor.txt.html(), this.restInput.bind(this),this.state.imgList)
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