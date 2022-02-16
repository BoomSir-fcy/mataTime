import React, { forwardRef, useImperativeHandle } from 'react';

import ReactDOM from 'react-dom';
import {
  SlateBox,
  SendButton,
  CancelButton,
  MentionContent,
  MentionItems,
} from '../../style';

export const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

const MentionPortal = ({ pref, chars, index, onItemClick }) => {
  return (
    <Portal>
      <MentionContent ref={pref} data-cy='mentions-portal'>
        {chars.map((char, i) => (
          <MentionItems
            key={char.uid}
            onClick={event => {
              event.preventDefault();
              onItemClick({
                uid: chars[i].uid,
                character: `@${chars[i].nick_name}`,
              });
            }}
            style={{
              background: i === index ? 'rgb(247, 249, 249)' : 'transparent',
            }}
          >
            {char.nick_name}
          </MentionItems>
        ))}
      </MentionContent>
    </Portal>
  );
};

export default MentionPortal;
