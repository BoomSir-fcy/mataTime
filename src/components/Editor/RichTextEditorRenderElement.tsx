import React, { useState, useCallback } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Box, BoxProps, Card, Text } from 'uikit';

const CodeStyled = styled.code`
  color: red;
`;

export const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <CodeStyled>{props.children}</CodeStyled>
    </pre>
  );
};

export const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};
