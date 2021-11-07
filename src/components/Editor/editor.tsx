import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex, Button, Svg } from 'uikit';
import { Api } from 'apis';
import { Toolbar } from './toolbar';
import { ImgList } from './ImgList'
import { toast } from 'react-toastify'
import { mediaQueriesSize } from 'uikit/theme/base';

const EditorWarpper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
`
const EditorTextarea = styled.textarea`
  width: 100%;
  min-height: 112px;
  vertical-align:middle;
  // color: ${({ theme }) => theme.colors.text};
  color:#fff;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
  border-bottom-right-radius: 0;
border-bottom-left-radius: 0;
  border: 0;
  outline: 0;
  resize: none;
  font-size: 16px;
  ${mediaQueriesSize.padding}
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
      }
    &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background   : rgba(83,83,83,0.5);
    }
    min-height: 112px;
    max-height: 150px;
  }
`

const SendButton = styled(Button)`
border-radius: ${({ theme }) => theme.radii.card};
width: 100px;
height: 35px;
border-radius: 10px;
background-color:#4168ED;
margin-top:12px;
`;
const EditorToolbar = styled(Flex)`
`
type Iprops = {
  sendArticle: (string, ...args: any[]) => void,
  type: string
}
export const Editor = React.memo((props: Iprops) => {

  const [state, setState] = useImmer({
    cursor: 0,
    editorValue: "",
    imgList: []
  });
  const editor = React.useRef(null);

  const insertMyText = (event: any, text: string) => {
    const { cursor } = state;
    const { value } = event;
    let textBefore = value.substring(0, cursor);
    let textAfter = value.substring(cursor, value.length);
    return textBefore + text + textAfter;
  }

  const handleSelect = React.useCallback((data) => {
    const { editorValue, cursor } = state;
    let newValue = insertMyText(editor.current, data);
    setState(p => {
      p.cursor = cursor + data.length;
      p.editorValue = cursor > 0 ? newValue : (editorValue + data);
    })
  }, [state]);
  const handleSelectImg = React.useCallback((data) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.name = 'file'
    input.accept = '.png,.jpg,.jpeg,.gif'
    input.onchange = async (e: any) => {
      if (!e.target.files[0]) return false
      if (state.imgList.length >= 9) return toast.error('最多上传九张')
      const file = e.target.files[0];
      let fr: any = new FileReader();
      // 读取文件
      fr.readAsDataURL(file);
      // 将文件转为base64
      fr.onload = () => {
        Api.CommonApi.uploadImg({ dir_name: props.type, base64: fr.result }).then(res => {
          setState({
            ...state,
            imgList: [...(state.imgList || []), res.data.full_path]
          })
        })
      }
    }
    input.click()
  }, [state]);
  const delImgItem = (imgList) => {
    setState({
      ...state,
      imgList: imgList
    })
  }
  const restInput = () => {
    setState({
      ...state,
      editorValue: ''
    })
  }
  //话题替换增加连接   
function ReplaceTopic(str){   
  let r, k;   // 声明变量。   
  let ss = str;   
  r=ss.replace(/\#([^\#|.]+)\#/g, function(word){
      k = encodeURI(word.replace(/\#/g,""));   
      return "<a href=\"s/?a=weibo&k="+ k +"\">" + word + "</a>";   
      }   
  );   
  return(r);  //返回替换后的字符串   
}   

//@替换增加连接   
function ReplaceAt(str){   
  let r, k  // 声明变量。   
  let ss = str;   
  r=ss.replace(/\@([^\@|.|^ ]+)/g, function(word){   
      k = encodeURI(word.replace(/\@/g,""));   
      return "<a href=\"n/?a=user&k="+ k +"\" usercard=\"name="+ k +"\">" + word + "</a>";   
      }   
  )
  return(r);  //返回替换后的字符串    
}   
  const sendArticle = () => {
    props.sendArticle(ReplaceAt(ReplaceTopic(state.editorValue)), restInput, state.imgList.join(','))
  }
  const callbackInserTopic = () => {
    setState({
      ...state,
      editorValue: state.editorValue+' #请输入话题# '
    })
  }
  const callbackInserAt = () => {
    setState({
      ...state,
      editorValue: state.editorValue+' @xxx '
    })
  }
  return (
    <EditorWarpper>
      <EditorTextarea id="input" placeholder="分享新鲜事" ref={editor}
        value={state.editorValue}
        onBlur={(e) => setState(p => { p.cursor = e.target.selectionStart })}
        onChange={(e) => setState(p => { p.editorValue = e.target.value })} />
      <ImgList imgList={state.imgList || []} delImgItem={delImgItem}></ImgList>
      <Flex justifyContent="space-between" mt="12px">
        <Toolbar callback={handleSelect} callbackSelectImg={handleSelectImg} callbackInserTopic={callbackInserTopic} callbackInserAt={callbackInserAt} />
        <Button onClick={sendArticle}>发布</Button>
      </Flex>
    </EditorWarpper>
  )
})