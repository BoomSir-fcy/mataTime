import { useCallback } from "react";
import reactStringReplace from 'react-string-replace';
import { Text } from 'slate';
import {
  SQUARE_REGEXP,
  HTTP_REGEXP,
  SYMBOL_REGEXP,
} from 'config/constants/regexp';

const decorate = ([node, path]) => {
  const ranges = [];

  const pushRange = (text, search, key) => {
    const parts = text.split(search);
    let offset = 0;

    parts.forEach((part, i) => {
      if (i !== 0) {
        ranges.push({
          anchor: { path, offset: offset - search.length },
          focus: { path, offset },
          highlight: true,
          [key]: true
        });
      }

      offset = offset + part.length + search.length;
    });
  }

  if (Text.isText(node)) {
    const { text } = node;
    reactStringReplace(text, HTTP_REGEXP, (match, i) => {
      pushRange(text, match, 'http')
      return ''
    });
    reactStringReplace(text, SYMBOL_REGEXP, (match, i) => {
      pushRange(text, match, 'symbol')
      return ''
    });
    reactStringReplace(text, SQUARE_REGEXP, (match, i) => {
      pushRange(text, match, 'topic')
      return ''
    });
  }

  return ranges;
}
export default decorate