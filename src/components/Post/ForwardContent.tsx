import React from 'react';
import styled from 'styled-components';
import { Box } from 'uikit';

const Content = styled(Box)`
  padding: 25px 20px 64px;
  ${({ theme }) => theme.mediaQueriesSize.absmargin}
  background-color: ${({ theme }) => theme.colors.backgroundCard};
`;

const ForwardContent = () => {
  return <Content>1111</Content>;
};

export default ForwardContent;
