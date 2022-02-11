import React, { useState, useCallback } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Box, BoxProps, Card, Text } from 'uikit';
import Image from './Image';
import { DefaultElement, Code, Ol, Ul } from './styleds';

const CodeStyled = styled.code`
  /* color: red; */
  font-family: monospace;
  & > * {
    font-family: monospace;
  }
`;

export const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <CodeStyled>{props.children}</CodeStyled>
    </pre>
  );
};

export const Element = props => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <Ul {...attributes}>{children}</Ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <Ol {...attributes}>{children}</Ol>;
    case 'image':
      return <Image {...props} />;
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

  return <span {...attributes}>{children}</span>;
};
