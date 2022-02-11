import isHotkey from 'is-hotkey'
import { toggleMark } from './toggleMark'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+k': 'del',
  'mod+`': 'code',
}

export const onHotkeyDown = (editor, event) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault()
      const mark = HOTKEYS[hotkey]
      toggleMark(editor, mark)
    }
  }
}