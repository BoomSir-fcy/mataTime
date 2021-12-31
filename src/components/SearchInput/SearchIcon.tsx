import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Image } from 'uikit';

const TopBox = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: linear-gradient(90deg, #353535, #080808);
  /* transition: opacity 0.5s; */
  background-color: pink;
`;

const SearchIcon = () => {

  return (
    <TopBox>
      <Flex
        height='100%'
        width='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Image width={20} height={20} src='/images/search-dark.png' />
      </Flex>
    </TopBox>
  );
};
export default SearchIcon;
