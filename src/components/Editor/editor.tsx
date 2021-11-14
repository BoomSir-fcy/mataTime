import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import { Editor as slateEditor, Transforms, Range, createEditor, Descendant,Element as SlateElement } from 'slate'
import {Flex} from 'uikit'
import { withHistory } from 'slate-history'
import {Toolbar} from './toolbar'
import {ImgList} from './ImgList'
import {Api} from 'apis'
import {toast} from 'react-toastify'
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
  useSlate
} from 'slate-react'
import {SlateBox,SendButton} from './style'
import { MentionElement } from './custom-types'
import {SearchPop,FollowPopup} from 'components'
import {Mention,TopicElement} from './elements'
type Iprops= {
  type:any
  sendArticle:any
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          ''
      }
    ]
  }
]
const withMentions = editor => {
  const { isInline, isVoid } = editor
  const tempEditor = editor
  tempEditor.isInline = element => {
    return element.type === 'mention' ? true : isInline(element)
  }
  tempEditor.isVoid = element => {
    return element.type === 'mention' ? true : isVoid(element)
  }
  return tempEditor
}
const withTopics = editor => {
  const { isInline, isVoid } = editor
  const tempEditor = editor
  tempEditor.isInline = element => {
    return element.type === 'topic' ? true : isInline(element)
  }
  tempEditor.isVoid = element => {
    return element.type === 'topic' ? true : isVoid(element)
  }
  return tempEditor
}
const insertMention = (editor, {character,uid}) => {
  const mention: MentionElement = {
    type: 'mention',
    character,
    attrs:{userid:uid},
    children: [{ text: '' }],
  }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}
const insertTopic= (editor, {character}) => {
  const topic: any = {
    type: 'topic',
    character,
    children: [{ text: '' }],
  }
  Transforms.insertNodes(editor, topic)
  // Transforms.wrapNodes(editor, topic, { split: true })
  // Transforms.collapse(editor, { edge: 'end' })
}
export  const Editor = (props:Iprops) => {
  const ref = useRef<HTMLDivElement | null>()
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const [imgList,setImgList] = useState([])
  const [searchUser,setSearchUser] = useState(false)
  const [searcTopic,setSearcTopic] = useState(false)
  const renderElement = useCallback(props =>{
    switch (props.element.type) {
      case 'mention':
        return <Mention {...props} />
      case 'topic':
        return <TopicElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const editor = useMemo(
    () => withTopics(withMentions(withReact(withHistory(createEditor())))),
    []
  )
  // 扩大focus距离
  useEffect(() => {
    const el:any = ref.current
    const eventFn =(e:any)=>{
      if(e.target.className!=='text-box') return false
      el.firstElementChild.focus()
      const range = window.getSelection();//创建range
      range.selectAllChildren(el.firstElementChild);//range 选择obj下所有子内容
      range.collapseToEnd();//光标移至最后
    }
    el.addEventListener('click',eventFn)
    return ()=>{
      el.removeEventListener('click',eventFn)
    }
  },[])

  const callbackSelectImg = (e)=>{
    if (imgList.length >= 9) return toast.error('最多上传九张')
    const input = document.createElement('input')
    input.type = 'file'
    input.name = 'file'
    input.accept = '.png,.jpg,.jpeg,.gif'
    input.onchange = async (e: any) => {
      if (!e.target.files[0]) return false
      const file = e.target.files[0];
      let fr: any = new FileReader();
      // 读取文件
      fr.readAsDataURL(file);
      // 将文件转为base64
      fr.onload = () => {
        Api.CommonApi.uploadImg({ dir_name: props.type, base64: fr.result }).then(res => {
          if(Api.isSuccess(res)){
            setImgList([...imgList,res.data.full_path])
            toast.success('上传成功')
          }else{
            toast.error('上传失败')
          }
        })
      }
    }
    input.click()
  }
  const sendArticle = ()=>{
    console.log(value,imgList);
    
    // props.sendArticle(ReplaceAt(ReplaceTopic(state.editorValue)), restInput, state.imgList.join(','))
  }
  const searchSelect =(data,type)=>{
    setSearcTopic(false)
    setSearchUser(false)
    if(!data)return
    if(type==='user'){
      insertMention(editor, {uid:data.uid,character:'@'+data.nick_name})
    }
    if(type==='topic'){
      insertTopic(editor,{character:'hhhhh'})
    }
  }
  return (
    <SlateBox>
      <SearchPop type={searchUser?'user':'topic'} show={searcTopic||searchUser} callback={searchSelect}></SearchPop>
      <Slate
        editor={editor}
        value={value}
        onChange={value => setValue(value)}
      >
        <div className="text-box" ref={ref}>
          <Editable
            autoFocus
            renderElement={renderElement}
            placeholder="分享新鲜事"
          />
        </div>
        <ImgList delImgItem={(data)=>setImgList(data)} imgList={imgList}></ImgList>
        <Flex justifyContent="space-between" alignItems="center">
        <Toolbar
          callbackEmoji={(data)=>editor.insertText(data)}
          callbackSelectImg={callbackSelectImg}
          callbackInserAt={()=>setSearchUser(!searchUser)}
          callbackInserTopic={()=>setSearcTopic(!searcTopic)}
        ></Toolbar>
        <SendButton onClick={sendArticle}>发表</SendButton>
        </Flex>
      </Slate>
    </SlateBox>
  )
}
