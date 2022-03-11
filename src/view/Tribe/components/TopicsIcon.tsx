import { Icon } from 'components';
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

const TopicsIcon = () => {
  return (
    <TopBox>
      <Flex
        height='100%'
        width='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Icon size={28} color='white' name='icon-24gf-tags2' />
      </Flex>
    </TopBox>
  );
};
export default TopicsIcon;
