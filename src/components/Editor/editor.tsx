import React from 'react';
// import styled from 'styled-components';
// import { useImmer } from 'use-immer';
import E from 'wangeditor'
// import { Emoji } from './emoji';
// import { Toolbar } from './toolbar';
import {
  EditorWarpper,
  SendButton,
  TextBox,
  Toolbar
} from './style'
{/* <SendButton>发布</SendButton> */}
const {BtnMenu} = E
export class Editor extends React.Component {
  editor:any
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.initEditor()
  }
  initEditor(){
    const editor = new E('#toolbar','#textbox')
    editor.config.placeholder = '分享新鲜事'
    editor.config.height = 500
    // editor.config.showFullScreen = true
    editor.config.showLinkImg = false
    editor.config.menus=[
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
      clickHandler() {
        editor.cmd.do("insertHTML", `<span contenteditable="false">&nbsp;<span style="color:blue">@李某某</span>&nbsp;</span>`);
      }
      // 菜单激活状态
      tryChangeActive() {
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
      clickHandler() {
        editor.cmd.do("insertHTML", `<span contenteditable="false">&nbsp;<span style="color:blue">#瓜娃子#</span>&nbsp;</span>`);
      }
      // 菜单激活状态
      tryChangeActive() {
        this.active(); // 菜单激活
        // this.unActive() // 菜单不激活
      }
    }
    editor.menus.extend("aite",   InsertAT);
    editor.menus.extend("topic",   InsertTopic);
    editor.config.menuTooltipPosition = 'down'
    editor.config.menus = editor.config.menus.concat('aite','topic');
    editor.config.uploadImgShowBase64 = true
    editor.config.onchange = function (newHtml) {
    };
    editor.create()
    this.editor = editor
  } 
  componentWillUnmount(){
    this.editor.destroy();
  }
  sendArticle(){
    console.log(this.editor.txt.html());
  }
  render() {
    return(
      <EditorWarpper>
        <TextBox id="textbox"></TextBox>
        <Toolbar justifyContent="space-between" alignItems="center">
          <div id="toolbar"></div>
        <SendButton onClick={this.sendArticle.bind(this)}>发表</SendButton>
        </Toolbar>
      </EditorWarpper>
    )
  }
}