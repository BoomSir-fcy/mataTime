import React, { useState, useCallback } from 'react';
import reactStringReplace from 'react-string-replace';
import styled, { DefaultTheme } from 'styled-components';
import { Mention, LinkWithText } from 'components/Editor/elements';
import { Box, BoxProps, Card, Text } from 'uikit';
import {
  SQUARE_REGEXP,
  HTTP_REGEXP,
  SYMBOL_REGEXP,
} from 'config/constants/regexp';
import Image from './Image';
// import { Mention } from './Mention';
import { DefaultElement, Code, Ol, Ul, Highlight, Blockquote } from './styleds';
import { useSlateStatic } from 'slate-react';

export const Element = props => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();

  switch (element.type) {
    case 'block-quote':
      return <Blockquote {...attributes}>{children}</Blockquote>;
    case 'bulleted-list':
      return <Ul {...attributes}>{children}</Ul>;
    // case 'heading-one':
    //   return <h1 {...attributes}>{children}</h1>;
    // case 'heading-two':
    //   return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <Ol {...attributes}>{children}</Ol>;
    case 'image':
      return <Image {...props} isEditor editor={editor} />;
    case 'code':
      return <Code {...props} />;
    case 'mention':
      return <Mention {...props} />;
    case 'link':
      return <LinkWithText {...props} />;
    case 'code':
      return <Code {...props} />;
    default:
      return <DefaultElement {...attributes}>{children}</DefaultElement>;
  }
};

export const ContentTextStyled = styled(Text)`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  min-height: 1.1875em;
  font-family: Arial;
  line-height: 1.1875;
  user-select: text;
  display: inline;
`;

export const Leaf = ({ attributes, children, leaf }) => {
  /* eslint-disable */
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  // if (leaf.code) {
  //   children = <Code>{children}</Code>;
  //   children = (
  //     <Code>
  //       <code>{children}</code>
  //     </Code>
  //   );
  // }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.del) {
    children = <del>{children}</del>;
  }

  if (leaf.highlight) {
    children = <Highlight>{children}</Highlight>;
  }

  return <ContentTextStyled {...attributes}>{children}</ContentTextStyled>;
};