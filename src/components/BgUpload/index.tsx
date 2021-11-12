import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Button } from 'uikit';
import { Upload } from 'components';

const Background = styled(Flex)`
  width: 100%;
  background: skyblue;
  border-radius: 10px;
  padding: 190px 0 55px;
  justify-content: center;
`;

const BgUpload = () => {
  return (
    <Background>
      <Upload multiple uploadSuccess={(imgSrc: string) => console.log(imgSrc)} />
    </Background>
  );
};

export default BgUpload;
