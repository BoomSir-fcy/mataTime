import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
  useSlate
} from 'slate-react';
import { FollowPopup } from 'components';
import { MentionBox } from './style';

export const Mention = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <MentionBox
      {...attributes}
      {...element.attrs}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(' ', '-')}`}
      style={{
        margin: '0 8px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        fontSize: '0.9em'
      }}
    >
      {element.character}
      {children}
    </MentionBox>
  );
};

export const InlineChromiumBugfix = () => (
  <span contentEditable={false} style={{ fontSize: 0 }}>
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

export const TopicElement = ({ attributes, children, element }) => {
  return (
    <>
      <span {...attributes}>
        {/* {children} */}
        #
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />#
      </span>
    </>
  );
};
