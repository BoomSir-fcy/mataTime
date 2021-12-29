import styled from "styled-components";
import { Flex, Box, Button, Text, Input, CardProps } from 'uikit';

export const SearchItem = styled(Flex)`
  height: 69px;
  /* background: ${({ theme }) => theme.colors.backgroundCard}; */
  padding: 0 18px;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.hoverList};
  }
`
