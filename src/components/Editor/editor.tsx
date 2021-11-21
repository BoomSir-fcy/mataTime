import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { Editor as slateEditor, Transforms, Range, createEditor, Descendant, Element as SlateElement } from 'slate';
import { Flex } from 'uikit';
import { withHistory } from 'slate-history';
import { Toolbar } from './toolbar';
import { ImgList } from './ImgList';
import { Api } from 'apis';
import { toast } from 'react-toastify';
import { Slate, Editable, ReactEditor, withReact, useSelected, useFocused, useSlate } from 'slate-react';
import { SlateBox, SendButton, CancelButton } from './style';
import { MentionElement } from './custom-types';
import { SearchPop, FollowPopup } from 'components';
import { Mention, TopicElement } from './elements';
import { useTranslation } from 'contexts/Localization';

type Iprops = {
  type: any
  initValue?: any
  sendArticle: any
  cancelSendArticle?: any
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: ''
      }
    ]
  }
];
const withMentions = editor => {
  const { isInline, isVoid } = editor;
  const tempEditor = editor;
  tempEditor.isInline = element => {
    return element.type === 'mention' ? true : isInline(element);
  };
  tempEditor.isVoid = element => {
    return element.type === 'mention' ? true : isVoid(element);
  };
  return tempEditor;
};
const withTopics = editor => {
  const { isInline, isVoid } = editor;
  const tempEditor = editor;
  tempEditor.isInline = element => {
    return element.type === 'topic' ? true : isInline(element);
  };
  return tempEditor;
};
const insertMention = (editor, { character, uid }) => {
  const mention: MentionElement = {
    type: 'mention',
    character,
    attrs: { userid: uid },
    children: [{ text: '' }]
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};
const insertTopic = (editor, { character = '' }) => {
  const topic: any = {
    type: 'topic',
    children: [{ text: character }]
  };
  Transforms.insertNodes(editor, topic);
};
export const Editor = (props: Iprops) => {
  const { initValue = null, cancelSendArticle = () => { }, type } = props;
  const [isDisabledSend,setIsDisabledSend] = useState(true)
  const ref = useRef<HTMLDivElement | null>();
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [imgList, setImgList] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const [searcTopic, setSearcTopic] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const { t } = useTranslation();
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'mention':
        return <Mention {...props} />;
      case 'topic':
        return <TopicElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const editor = useMemo(() => withTopics(withMentions(withReact(withHistory(createEditor())))), []);
  useEffect(() => {
    try {
      setValue(JSON.parse(props.initValue) || initialValue);
      setRefresh(refresh === 1 ? 2 : 1);
    } catch (err) { }
  }, [props.initValue]);
  // 扩大focus距离
  useEffect(() => {
    const el: any = ref.current;
    const eventFn = (e: any) => {
      if (e.target.className !== 'text-box') return false;
      el.firstElementChild.focus();
      const range = window.getSelection(); //创建range
      range.selectAllChildren(el.firstElementChild); //range 选择obj下所有子内容
      range.collapseToEnd(); //光标移至最后
    };
    el.addEventListener('click', eventFn);
    return () => {
      el.removeEventListener('click', eventFn);
    };
  });

  const callbackSelectImg = e => {
    const input = document.createElement('input');
    input.type = 'file';
    input.name = 'file';
    input.multiple = true;
    input.accept = '.png,.jpg,.jpeg';
    input.onchange = async (e: any) => {
      const selectFiles = e.target.files;
      if (!selectFiles[0]) return false;
      if (imgList.length + selectFiles.length > 9) return toast.error(t('uploadImgMaxMsg'));
      const fileList: string[] = [];
      for (let file of selectFiles) {
        let fr: any = new FileReader();
        // 读取文件
        fr.readAsDataURL(file);
        // 将文件转为base64
        fr.onload = () => {
          fileList.push(fr.result);
          if (fileList.length === selectFiles.length) {
            Api.CommonApi.uploadImgList({ dir_name: props.type, base64: fileList }).then(res => {
              if (Api.isSuccess(res)) {
                setImgList([...imgList, ...res.data.map(item => item.full_path)]);
                toast.success(t('uploadImgSuccessMsg'));
                console.log(imgList);
              } else {
                toast.error(t('uploadImgErrorMsg'));
              }
            });
          }
        };
      }
    };
    input.click();
  };
  const restInput = () => {
    setValue(initialValue);
    setImgList([])
    setRefresh(refresh === 1 ? 2 : 1);
  };
const deepContent = (arr)=>{
  let content= '',
  userIdList=[]
  const deepArr = (data)=>{
    data.forEach(item=>{
        if(item.type==='mention'){
          userIdList.push(item.character.slice(1) + '_' + item.attrs.userid)
        }
        if(item.text||item.character){
          content+=(item.text||item.character)
        }
        if(item.children){
        deepArr(item.children)
      }
    })
  }
  deepArr(arr)
  return {
    content,
    userIdList
  }
}
  const [timeId,setTimeId] = useState(null)
  const sendArticle = () => {
    if(timeId) return toast.warning('间隔时间需超过3秒!')
    setTimeId(
      setTimeout(() =>{
        setTimeId(null)
      },3000)
    )
    // 递归收集字符和@的id
    // let userIdList = []
    // let content = ''
    let {userIdList,content} = deepContent(value)
    if(content.length>140){
      setTimeId(null)
      return toast.warning('字数不可超过140')
    }
    props.sendArticle(JSON.stringify(value), restInput, imgList.join(','), userIdList.join(','));
    restInput()
  };
  const searchSelect = (data, type) => {
    setSearcTopic(false);
    setSearchUser(false);
    if (!data) return;
    if (type === 'user') {
      insertMention(editor, { uid: data.uid, character: '@' + data.nick_name });
    }
    if (type === 'topic') {
      insertTopic(editor, { character: data.topic_name });
    }
  };
  return (
    <SlateBox key={refresh}>
      <SearchPop type={searchUser ? 'user' : 'topic'} show={searcTopic || searchUser} callback={searchSelect}></SearchPop>
      <Slate editor={editor} value={value} onChange={value => {
        const {content} = deepContent(value)
          setValue(value)
        setIsDisabledSend(!content)
      }}>
        <div className="text-box" ref={ref}>
          <Editable autoFocus renderElement={renderElement} placeholder={type === 'comment' ? t('newsCommentReply') : t('editorPlaceholder')} />
        </div>
        <ImgList delImgItem={data => setImgList(data)} imgList={imgList}></ImgList>
        <Flex justifyContent="space-between" alignItems="center">
          <Toolbar
          type={type}
            callbackEmoji={data => editor.insertText(data)}
            callbackSelectImg={callbackSelectImg}
            callbackInserAt={() => setSearchUser(!searchUser)}
            callbackInserTopic={() => setSearcTopic(!searcTopic)}
          ></Toolbar>
          {initValue ? (
            <div>
              <CancelButton onClick={cancelSendArticle}>取消</CancelButton>
              <SendButton disabled={isDisabledSend} onClick={sendArticle}>保存并发布</SendButton>
            </div>
          ) : (
            <SendButton disabled={isDisabledSend}  onClick={sendArticle}>{type === 'comment' ? t('newsCommentReply') : t('sendBtnText')}</SendButton>
          )}
        </Flex>
      </Slate>
    </SlateBox>
  );
};
