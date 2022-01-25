import React from 'react';
import styled from 'styled-components';
import { Flex, Divider, Heading } from 'uikit';

const SubHeader = ({ title }) => {
  return (
    <>
      <Flex pl='16px' height='60px' alignItems='center'>
        <Heading>{title}</Heading>
      </Flex>
      <Divider />
    </>
  );
};

export default SubHeader;
