import React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'uikit';

export const PARAGRAPH_MT = '1em';

export const mt = css`
  margin-top: ${PARAGRAPH_MT};
`;

export const Blockquote = styled.blockquote`
  /* margin: 1.4em 0; */
  ${mt}
  padding-left: 1em;
  color: #646464;
  border-left: 3px solid #d3d3d3;
  & + blockquote {
    margin-top: 0.4em;
  }
`;

export const Ul = styled.ul`
  ${mt}
  list-style-type: disc;
`;

export const Li = styled.li``;

export const Ol = styled.ol`
  ${mt}
  list-style-type: decimal;
`;

export const H1 = styled.h1``;

export const H2 = styled.h2``;

export const DefaultElement = styled.p`
  ${mt}
`;

export const Strong = styled.strong``;

export const Code = styled.code`
  font-family: monospace;
  /* background: red; */
  background: ${({ theme }) => theme.colors.codebg};
  & > * {
    font-family: monospace;
  }
`;

export const Em = styled.em``;

export const U = styled.u``;

export const Span = styled.span``;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
`;
