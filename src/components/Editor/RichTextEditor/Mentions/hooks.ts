import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
  useSlate
} from 'slate-react'
import { Editor, Transforms, Range, createEditor, Descendant } from 'slate'
import { debounce, cloneDeep } from 'lodash';
import { CHARACTERS } from './data'
import { MentionElement } from 'components/Editor/custom-types'
import { Api } from 'apis';

export const insertMention = (editor, { character, uid }) => {
  const mention: MentionElement = {
    type: 'mention',
    character,
    attrs: { userid: uid },
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};


export const useMentions = (editor, ref, tribeId?: number) => {
  const [target, setTarget] = useState<Range | undefined>()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [userList, setUserList] = useState([])

  const chars = useMemo(() => {
    return CHARACTERS.filter(c =>
      c.toLowerCase().startsWith(search.toLowerCase())
    ).slice(0, 10)
  }, [search])

  // 模糊查询用户
  const onSearchUser = useCallback(
    debounce(async (nickName: string) => {
      try {
        if (!nickName) return
        let res = null
        if (tribeId) {
          res = await Api.TribeApi.tribeUserSearchByName({
            name: nickName,
            tribe_id: tribeId
          });
        } else {
          res = await Api.UserApi.searchUser(nickName);
        }
        if (Api.isSuccess(res)) {
          setUserList(res.data || [])
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000),
    [setUserList, tribeId],
  );

  const onKeyDown = useCallback(
    event => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= userList.length - 1 ? 0 : index + 1;
            setIndex(prevIndex)
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? userList.length - 1 : index - 1;
            setIndex(nextIndex)
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            if (!userList.length) return;
            insertMention(editor, {
              uid: userList[index].uid,
              character: `@${userList[index].nick_name}`,
            });
            setTarget(null);
            setUserList([])
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, userList, search, target]
  )

  const onItemClick = useCallback(({ uid, character }) => {
    Transforms.select(editor, target);
    insertMention(editor, {
      uid,
      character,
    });
    setTarget(null);
    setUserList([])
  }, [])

  const onChangeHandle = useCallback((selection) => {
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection)
      const wordBefore = Editor.before(editor, start, { unit: 'word' })
      const before = wordBefore && Editor.before(editor, wordBefore)
      const beforeRange = before && Editor.range(editor, before, start)
      const beforeText = beforeRange && Editor.string(editor, beforeRange)
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
      const after = Editor.after(editor, start)
      const afterRange = Editor.range(editor, start, after)
      const afterText = Editor.string(editor, afterRange)
      const afterMatch = afterText.match(/^(\s|$)/)

      if (beforeMatch && afterMatch) {
        onSearchUser(beforeMatch[1]);
        setTarget(beforeRange);
        setSearch(beforeMatch[1])
        setIndex(0)
        return;
      }
    }

    setTarget(null)
  }, [editor, setTarget, setIndex, setSearch, onSearchUser])

  useEffect(() => {
    if (target && ref.current && chars.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, ref, editor, index, search, target])

  return {
    onKeyDown,
    onChangeHandle,
    ref,
    chars,
    index,
    target,
    onItemClick,
    userList,
  }
}