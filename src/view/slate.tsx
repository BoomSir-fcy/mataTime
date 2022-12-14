import React, { useState, useMemo } from 'react';
import { createEditor, Element, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

const PlainTextExample = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '40px 20px',
      }}
    >
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable placeholder='Enter some plain text...' />
      </Slate>
    </div>
  );
};

const initialValue: Element[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable plain text, just like a <textarea>!' },
    ],
  },
];

export default PlainTextExample;
