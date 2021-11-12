import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { Editor as slateEditor, Transforms, Range, createEditor, Descendant } from 'slate';
import { Flex } from 'uikit';
import { withHistory } from 'slate-history';
import { Toolbar } from './toolbar';
import { ImgList } from './ImgList';
import { Api } from 'apis';
import { toast } from 'react-toastify';
import { Slate, Editable, ReactEditor, withReact, useSelected, useFocused, useSlate } from 'slate-react';
import { SlateBox, SendButton } from './style';
type Iprops = {
  type: any;
  sendArticle: any;
};
const AtElement = props => {
  console.log(props);
  return (
    <span {...props.attributes}>
      {props.children}
      @哈哈哈
    </span>
  );
};
const TopicElement = props => {
  return (
    <span {...props.attributes}>
      {props.children}
      #牛逼#
    </span>
  );
};

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
export const Editor = (props: Iprops) => {
  const ref = useRef<HTMLDivElement | null>();
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [imgList, setImgList] = useState([]);
  const renderElement = useCallback(props => {
    console.log(props);

    switch (props.element.type) {
      case 'at':
        return <AtElement {...props} />;
      case 'topic':
        return <TopicElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  // 扩大focus距离
  useEffect(() => {
    const el: any = ref.current;
    const eventFn = () => {
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
    if (imgList.length >= 9) return toast.error('最多上传九张');
    const input = document.createElement('input');
    input.type = 'file';
    input.name = 'file';
    input.accept = '.png,.jpg,.jpeg,.gif';
    input.onchange = async (e: any) => {
      if (!e.target.files[0]) return false;
      const file = e.target.files[0];
      let fr: any = new FileReader();
      // 读取文件
      fr.readAsDataURL(file);
      // 将文件转为base64
      fr.onload = () => {
        Api.CommonApi.uploadImg({ dir_name: props.type, base64: fr.result }).then(res => {
          if (Api.isSuccess(res)) {
            setImgList([...imgList, res.data.full_path]);
            toast.success('上传成功');
          } else {
            toast.error('上传失败');
          }
        });
      };
    };
    input.click();
  };
  const callbackInserAt = e => {
    Transforms.setNodes<any>(editor, { type: 'at' }, { match: n => slateEditor.isBlock(editor, n) });
  };
  const callbackInserTopic = e => {
    Transforms.setNodes<any>(editor, { type: 'topic' }, { match: n => slateEditor.isBlock(editor, n) });
  };
  const sendArticle = () => {
    console.log(value);
    // props.sendArticle(ReplaceAt(ReplaceTopic(state.editorValue)), restInput, state.imgList.join(','))
  };
  return (
    <SlateBox>
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <div className="text-box" ref={ref}>
          <Editable renderElement={renderElement} placeholder="分享新鲜事" />
        </div>
        <ImgList delImgItem={data => setImgList(data)} imgList={imgList}></ImgList>
        <Flex justifyContent="space-between" alignItems="center">
          <Toolbar callbackEmoji={data => editor.insertText(data)} callbackSelectImg={callbackSelectImg} callbackInserAt={callbackInserAt} callbackInserTopic={callbackInserTopic}></Toolbar>
          <SendButton onClick={sendArticle}>发表</SendButton>
        </Flex>
      </Slate>
    </SlateBox>
  );
};
