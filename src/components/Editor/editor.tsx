/**
 * firefox
 * 中英文双重输入: https://github.com/ianstormtaylor/slate/pull/4702
 */
import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import {
  Editor as slateEditor,
  Transforms,
  Range,
  createEditor,
  Descendant,
  Element as SlateElement
} from 'slate';
import ReactDOM from 'react-dom';
import { useImmer } from 'use-immer';
import { debounce } from 'lodash';
import { Flex } from 'uikit';
import { withHistory } from 'slate-history';
import { Toolbar } from './toolbar';
import { UploadList } from './UploadList';
import { Api } from 'apis';
import { toast } from 'react-toastify';
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
  useSlate
} from 'slate-react';
import {
  SlateBox,
  SendButton,
  CancelButton,
  MentionContent,
  MentionItems
} from './style';
import { MentionElement } from './custom-types';
import { SearchPop, FollowPopup } from 'components';
import { Mention, TopicElement } from './elements';
import { useTranslation } from 'contexts/Localization';
import { getPostBLen } from 'utils';

import escapeHtml from 'escape-html';

type Iprops = {
  type: any;
  initValue?: any;
  sendArticle: any;
  cancelSendArticle?: any;
};

export const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
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

const insertTopic = (editor, character = '') => {
  // const topic: any = {
  //   type: 'topic',
  //   children: [{ text: character }]
  // };
  Transforms.insertText(editor, `#${character}#`);
  // Transforms.insertNodes(editor, topic);
};

// 20211210 去掉escapeHtml
function deep(children) {
  return children.map(item => {
    if (item.text) {
      return { ...item, text: item.text };
    }
    if (item.type === 'mention') {
      return { ...item, character: item.character };
    }
    return item;
  });
}

const parseValue = value => {
  let arr = value.map(item => {
    if (item.children) {
      return { ...item, children: deep(item.children) };
    } else {
      return item;
    }
  });
  return arr;
};

export const Editor = (props: Iprops) => {
  const { initValue = null, cancelSendArticle = () => {}, type } = props;
  const { t } = useTranslation();
  const [isDisabledSend, setIsDisabledSend] = useState(false);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [imgList, setImgList] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const [searcTopic, setSearcTopic] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [target, setTarget] = useState<Range | undefined>();
  const [stateEdit, setStateEdit] = useImmer({
    userList: [],
    search: '',
    index: 0
  });
  const ref = useRef<HTMLDivElement | null>();
  const mentionRef = useRef<HTMLDivElement | null>();
  const { userList, search, index } = stateEdit;

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'mention':
        return <Mention {...props} />;
      // case 'topic':
      //   return <TopicElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const editor = useMemo(
    () => withTopics(withMentions(withReact(withHistory(createEditor())))),
    []
  );

  // 模糊查询用户
  const atSearchUser = useCallback(
    debounce(async (nickName: string) => {
      console.log(nickName);
      try {
        const res = await Api.UserApi.searchUser(nickName);
        if (Api.isSuccess(res)) {
          setStateEdit(p => {
            p.userList = res.data || [];
          });
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000),
    []
  );

  const onKeyDown = useCallback(
    (event: any) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= userList.length - 1 ? 0 : index + 1;
            setStateEdit(p => {
              p.index = prevIndex;
            });
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? userList.length - 1 : index - 1;
            setStateEdit(p => {
              p.index = nextIndex;
            });
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            if (!userList.length) return;
            insertMention(editor, {
              uid: userList[index].uid,
              character: `@${userList[index].nick_name}`
            });
            setTarget(null);
            setStateEdit(p => {
              p.userList = [];
            });
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, search, target, userList]
  );

  useEffect(() => {
    try {
      setValue(JSON.parse(props.initValue) || initialValue);
      setRefresh(refresh === 1 ? 2 : 1);
    } catch (err) {}
  }, [props.initValue]);

  // 扩大focus距离
  // useEffect(() => {
  //   const el: any = ref.current;
  //   const eventFn = (e: any) => {
  //     if (e.target.className !== 'text-box') return false;
  //     const range = window.getSelection(); //创建range
  //     el.firstElementChild.focus();
  //     range.selectAllChildren(el.firstElementChild); //range 选择obj下所有子内容
  //     range.collapseToEnd(); //光标移至最后
  //   };
  //   el.addEventListener('click', eventFn);
  //   return () => {
  //     el.removeEventListener('click', eventFn);
  //   };
  // },[])
  useEffect(() => {
    setIsDisabledSend(imgList.length < 1);
  }, [imgList]);

  const callbackSelectImg = e => {
    const input = document.createElement('input');
    input.type = 'file';
    input.name = 'file';
    input.multiple = true;
    input.accept = '.png,.jpg,.jpeg,avif,bmp,gif,raw,tif,webp';
    input.onchange = async (e: any) => {
      const selectFiles = e.target.files;
      if (!selectFiles[0]) return false;
      if (imgList.length + selectFiles.length > 4)
        return toast.error(t('uploadImgMaxMsg'));
      const fileList: string[] = [];
      for (let file of selectFiles) {
        let fr: any = new FileReader();
        // 读取文件
        fr.readAsDataURL(file);
        // 将文件转为base64
        fr.onload = () => {
          fileList.push(fr.result);
          if (fileList.length === selectFiles.length) {
            Api.CommonApi.uploadImgList({
              dir_name: props.type,
              base64: fileList
            }).then(res => {
              if (Api.isSuccess(res)) {
                setImgList([
                  ...imgList,
                  ...res.data.map(item => item.full_path)
                ]);
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
    // https://joshtronic.com/2020/04/13/error-cannot-resolve-a-dom-point-from-slate-point/
    const point = { path: [0, 0], offset: 0 };
    editor.selection = { anchor: point, focus: point };
    editor.history = { redos: [], undos: [] };
    setValue(initialValue);
    setImgList([]);
    setIsDisabledSend(false);
    setRefresh(refresh === 1 ? 2 : 1);
  };

  const deepContent = arr => {
    let content = '',
      userIdList = [];
    const deepArr = data => {
      data.forEach(item => {
        if (item.type === 'mention') {
          userIdList.push(item.character.slice(1) + '_' + item.attrs.userid);
        }
        if (item.text || item.character) {
          content += item.text || item.character;
        }
        if (item.children) {
          deepArr(item.children);
        }
      });
    };
    deepArr(arr);
    return {
      content,
      userIdList
    };
  };

  const [timeId, setTimeId] = useState(null);
  const sendArticle = () => {
    if (timeId) return toast.warning(t('sendArticleMsgMaxTime'));
    setTimeId(
      setTimeout(() => {
        setTimeId(null);
      }, 3000)
    );
    // 递归收集字符和@的id
    // let userIdList = []
    // let content = ''
    let { userIdList, content } = deepContent(value);
    const newValue = parseValue(value);

    //限制用户输入数量
    if (getPostBLen(content) > 280) {
      setTimeId(null);
      return toast.warning(t('sendArticleMsgMaxWords'));
    }
    props.sendArticle(
      JSON.stringify(newValue),
      imgList.join(','),
      userIdList.join(',')
    );
    restInput();
  };

  const searchSelect = (data, type) => {
    setSearcTopic(false);
    setSearchUser(false);
    if (!data) return;
    if (type === 'user') {
      insertMention(editor, { uid: data.uid, character: '@' + data.nick_name });
    }
    if (type === 'topic') {
      insertTopic(editor, data.topic_name);
    }
  };

  // 计算模糊搜索框位置
  useEffect(() => {
    if (target && userList?.length > 0) {
      const el = mentionRef.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [userList, editor, index, search, target]);

  return (
    <SlateBox key={refresh}>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          setValue(value);

          const { content } = deepContent(value);
          const { selection } = editor;

          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = slateEditor.before(editor, start, {
              unit: 'word'
            });
            const before = wordBefore && slateEditor.before(editor, wordBefore);
            const beforeRange =
              before && slateEditor.range(editor, before, start);
            const beforeText =
              beforeRange && slateEditor.string(editor, beforeRange);
            const beforeMatch =
              beforeText && beforeText.match(/^@([\u4e00-\u9fa5_a-zA-Z0-9]+$)/);
            const after = slateEditor.after(editor, start);
            const afterRange = slateEditor.range(editor, start, after);
            const afterText = slateEditor.string(editor, afterRange);
            const afterMatch = afterText.match(/^(\s|$)/);

            if (beforeMatch && afterMatch) {
              atSearchUser(beforeMatch[1]);
              setTarget(beforeRange);
              setStateEdit(p => {
                p.index = 0;
                p.search = beforeMatch[1];
              });
              return;
            }
          }

          setTarget(null);
          setIsDisabledSend(!content);
        }}
      >
        <div
          className="text-box"
          ref={ref}
          style={{
            borderBottomRightRadius: imgList.length > 0 ? '0px' : '5px',
            borderBottomLeftRadius: imgList.length > 0 ? '0px' : '5px'
          }}
        >
          <Editable
            autoFocus
            renderElement={renderElement}
            onKeyDown={onKeyDown}
            placeholder={
              type === 'comment'
                ? t('newsCommentReply')
                : t('editorPlaceholder')
            }
          />
        </div>
        <UploadList delImgItem={data => setImgList(data)} imgList={imgList} />
        <Flex justifyContent="space-between" alignItems="center">
          <Toolbar
            type={type}
            callbackEmoji={data => editor.insertText(data)}
            callbackSelectImg={callbackSelectImg}
            callbackInserAt={() => setSearchUser(!searchUser)}
            callbackInserTopic={() => setSearcTopic(!searcTopic)}
          />
          {initValue ? (
            <div>
              <CancelButton onClick={cancelSendArticle}>取消</CancelButton>
              <SendButton disabled={isDisabledSend} onClick={sendArticle}>
                保存并发布
              </SendButton>
            </div>
          ) : (
            <SendButton disabled={isDisabledSend} onClick={sendArticle}>
              {type === 'comment' ? t('newsCommentReply') : t('sendBtnText')}
            </SendButton>
          )}
        </Flex>
        {(searcTopic || searchUser) && (
          <SearchPop
            type={searchUser ? 'user' : 'topic'}
            show={searcTopic || searchUser}
            callback={searchSelect}
          />
        )}

        {target && userList.length > 0 && (
          <Portal>
            <MentionContent ref={mentionRef} data-cy="mentions-portal">
              {userList.map((char, i) => (
                <MentionItems
                  key={char.uid}
                  onClick={event => {
                    event.preventDefault();
                    Transforms.select(editor, target);
                    insertMention(editor, {
                      uid: userList[i].uid,
                      character: `@${userList[i].nick_name}`
                    });
                    setTarget(null);
                    setStateEdit(p => {
                      p.userList = [];
                    });
                  }}
                  style={{
                    background:
                      i === index ? 'rgb(247, 249, 249)' : 'transparent'
                  }}
                >
                  {char.nick_name}
                </MentionItems>
              ))}
            </MentionContent>
          </Portal>
        )}
      </Slate>
    </SlateBox>
  );
};
