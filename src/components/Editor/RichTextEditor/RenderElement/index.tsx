import React, { useState, useCallback } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Box, BoxProps, Card, Text } from 'uikit';
import Image from './Image';
import { DefaultElement } from './styleds'

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
  console.log(props)
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'image':
      return <Image {...props} />;
    default:
      return <DefaultElement {...attributes}>{children}</DefaultElement>;
  }
};

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    return <strong {...attributes}>{children}</strong>;
  }

  if (leaf.code) {
    return <CodeStyled {...attributes}>{children}</CodeStyled>;
  }

  if (leaf.italic) {
    return <em {...attributes}>{children}</em>;
  }

  if (leaf.underline) {
    return <u {...attributes}>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
