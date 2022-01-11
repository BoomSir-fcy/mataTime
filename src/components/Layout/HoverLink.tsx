import { Link } from 'react-router-dom';
import styled from "styled-components";

export const HoverLink = styled(Link)`
  transition: background 0.3s;
  display: block;
  &:hover, &:active, &:focus {
    background: ${({ theme }) => theme.colors.hoverList};
    outline: none;
  }
`