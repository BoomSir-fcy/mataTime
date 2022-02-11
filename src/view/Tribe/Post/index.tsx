import React from 'react';
import { Crumbs } from 'components';
import RichTextEditor from 'components/Editor/RichTextEditor';
import styled from 'styled-components';
import { Box, Text } from 'uikit';
import SubHeader from '../components/SubHeader';

const BoxStyled = styled(Box)`
  padding: ${({ theme }) => theme.mediaQueriesSize.padding};
  margin: ${({ theme }) => theme.mediaQueriesSize.margin};
`;

const Post = () => {
  return (
    <Box>
      <Crumbs back />
      <SubHeader title='帖子信息' />
      <BoxStyled>
        <Text>* 正文</Text>
        <RichTextEditor />
      </BoxStyled>
    </Box>
  );
};

export default Post;
