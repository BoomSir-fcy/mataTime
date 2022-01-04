import styled from "styled-components";
import { Flex, Box, Text, Input, CardProps } from 'uikit';
import { Link } from 'react-router-dom';

export const LinkItem = styled(Link)`
  transition: background 0.3s;
  display: block;
  &:hover, &:active, &:focus {
    background: ${({ theme }) => theme.colors.hoverList};
    outline: none;
  }
`

export const SearchItem = styled(Flex)`
  height: 69px;
  padding: 0 18px;
`
