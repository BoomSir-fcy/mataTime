import { Editor } from 'components';
import { useTranslation } from 'contexts';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Descendant } from 'slate';
import styled from 'styled-components';
import { Flex, Input, Button, Card, Box } from 'uikit';
import { IM } from 'utils';

const InputBox = styled(Box)`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const SearchBox = styled(Card)<{ focus?: boolean }>`
  position: relative;
  padding: 0 16px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid
    ${({ focus, theme }) => (focus ? theme.colors.primary : 'transparent')};
  transition: all 0.3s;
  &:hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const InputStyled = styled(Input)`
  background: transparent;
  border: none;
  box-shadow: none;
`;

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

const removeEmptyText = value => {
  const resVal = [];
  value.forEach(item => {
    if (item.children) {
      const children = removeEmptyText(item.children);
      resVal.push({
        ...item,
        children: children.length ? children : null,
      });
      return;
    }
    const kyes = Object.keys(item);
    if (kyes.length > 1 || (kyes[0] === 'text' && item.text)) {
      resVal.push({ ...item });
    }
  });

  return resVal;
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
      if (!item.children) {
        content += '-'; // 换行算一个字符
      }
    });
  };
  deepArr(arr);
  content = content.slice(0, -1); // 计算结束后删除最后一个 -
  return {
    content,
    userIdList,
  };
};
const isEmptyLine = paragraph => {
  if (!paragraph) return true;
  const keys = Object.keys(paragraph);
  return (
    paragraph?.type === 'paragraph' &&
    !paragraph?.children &&
    keys.includes('type') &&
    keys.includes('children') &&
    keys.length === 2
  );
};

const removeEmptyLine = value => {
  const resVal = [];
  value.forEach((item, index) => {
    if (!(isEmptyLine(item) && isEmptyLine(value[index - 1]))) {
      resVal.push({ ...item });
    }
  });

  return resVal;
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

const SendInput: React.FC<{
  tribe_id: number;
  im: any;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [toFocus, setToFocus] = useState(false);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const { im, tribe_id } = props;

  const searchChange = useCallback(
    e => {
      setValue(e.target.value);
    },
    [setValue],
  );

  // 发送消息
  const handleSubmit = useCallback(
    e => {
      console.log(e);

      // im?.send(im.messageProtocol.WSProtocol_Chat_Message, {
      //   tribe_id: tribe_id,
      //   msg: e,
      // });
    },
    [im, tribe_id],
  );

  // 消息解析
  const handleNewMsg = useCallback(event => {
    const {
      data: { data },
    } = event;
    console.log(data, '消息');
  }, []);

  const sendArticle = text => {
    // if (timeId) return toast.warning(t('sendArticleMsgMaxTime'));
    // setTimeId(
    //   setTimeout(() => {
    //     setTimeId(null);
    //   }, 3000),
    // );
    // 递归收集字符和@的id
    // let userIdList = []
    // let content = ''
    let { userIdList } = deepContent(text);
    const newValue = parseValue(text);

    const newValue1 = removeEmptyText(newValue);
    const newValue2 = removeEmptyLine(newValue1); // 删除空行

    let { content } = deepContent(newValue2);
    if (!content.length) return;
    //限制用户输入数量
    // if (articleLength > maxCreateNum) {
    //   setTimeId(null);
    //   return toast.warning(
    //     t('sendArticleMsgMaxWordsOf%num%', {
    //       num: maxCreateNum,
    //     }),
    //   );
    // }

    handleSubmit(
      JSON.stringify(newValue2),
      // imgList.join(','),
      // userIdList.join(','),
      // restInput,
    );
  };

  // 加入聊天室
  useEffect(() => {
    if (tribe_id && im) {
      im?.send(im.messageProtocol.WSProtocol_Join_Chat, {
        tribe_id: tribe_id,
        join: true,
      });
    }
  }, [tribe_id, im]);

  // 接收消息
  useEffect(() => {
    if (im) {
      im.addEventListener(IM.EventType.UNREAD_NOTIFY, handleNewMsg);
    }
    return () => {
      if (im) {
        im.removeEventListener(IM.EventType.UNREAD_NOTIFY, handleNewMsg);
      }
    };
  }, [im]);

  return (
    <InputBox>
      <Editor type='post' ispadding={false} sendArticle={sendArticle} />
      {/* <form
        name='ChatForm'
        id='ChatForm'
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={e => {
          if (toFocus) {
            setToFocus(false);
            e.target.focus();
            return;
          }
          setFocus(false);
        }}
        onSubmit={event => {
          event.preventDefault();
          sendArticle(value);
          // handleSubmit(value.trim());
          // if (inputRef.current) {
          //   inputRef.current.blur();
          // }
        }}
        action=''
      >
        <label htmlFor='search'>
          <SearchBox focus={focus} isBoxShadow>
            <Flex height='100%' alignItems='center'>
              <InputStyled
                value={value}
                ref={inputRef}
                autoComplete='off'
                list='ice-cream-flavors'
                onChange={e => {
                  searchChange(e);
                }}
                type='search'
                id='search'
                placeholder={t('发送消息')}
              />
            </Flex>
          </SearchBox>
        </label>
      </form> */}
    </InputBox>
  );
};
export default SendInput;
