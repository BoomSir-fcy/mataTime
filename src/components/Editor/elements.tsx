import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
  useSlate,
} from 'slate-react';
import { FollowPopup } from 'components';
import { MentionBox } from './style';
import styled from 'styled-components';
import { Highlight } from './RichTextEditor/RenderElement/styleds';

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
        margin: '0 4px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
        fontSize: '0.9em',
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

const LinkStyled = styled.a`
  text-decoration: underline;
`

export const LinkWithText = ({ attributes, children, element }) => {
  return (
    <LinkStyled
      {...attributes}
      target='_blank'
      onClick={event => {
        event.stopPropagation();
        // event.preventDefault();
      }}
      href={element.href}
      title={element.href}
      rel='noreferrer'
    >
      <Highlight>
        {children}
      </Highlight>
    </LinkStyled>
  )
}