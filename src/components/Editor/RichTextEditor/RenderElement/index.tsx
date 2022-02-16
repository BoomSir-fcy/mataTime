import React, { useState, useCallback } from 'react';
import reactStringReplace from 'react-string-replace';
import styled, { DefaultTheme } from 'styled-components';
import { Mention } from 'components/Editor/elements';
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
      return <Image {...props} editor={editor} />;
    case 'mention':
      return <Mention {...props} />;
    default:
      return <DefaultElement {...attributes}>{children}</DefaultElement>;
  }
};

export const Leaf = ({ attributes, children, leaf }) => {
  /* eslint-disable */
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <Code>{children}</Code>;
  }

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

  return <span {...attributes}>{children}</span>;
};
