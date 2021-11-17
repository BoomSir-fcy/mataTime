import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Flex, Box, Button } from 'uikit';
const FooterCopyrightBox = styled.div`
  padding: 0 20px;
  width: 300px;
  margin-top: 10px;
  font-size: 16px;
  color: #b5b5b5;
  line-height: 35px;
  span {
    text-decoration: underline;
  }
`;
export const FooterCopyright: React.FC = () => {
  return (
    <FooterCopyrightBox>
      <Flex justifyContent="space-between">
        <span>Terms of Service </span>
        <span>Privacy Policy</span>
      </Flex>
      <div style={{ textAlign: 'center' }}>
        © Copyright 2021 Metatime. All Rights Reserved.
      </div>
    </FooterCopyrightBox>
  );
};
