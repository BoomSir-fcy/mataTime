import { Icon } from 'components';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'uikit';

const GoMsg = styled(Box)`
  position: absolute;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white_black};
  background: ${({ theme }) => theme.colors.gradients.buttonBg};
  padding: 4px 8px;
  min-width: 58px;
  bottom: 8px;
  right: -8px;
  cursor: pointer;
`;

const FloatBtn: React.FC<{ total_un_read: number }> = ({ total_un_read }) => {
  return (
    <GoMsg>
      <Flex alignItems='center'>
        <Icon size={14} color='white' current={0} name='icon-jiantou' />
        <Text ml='4px'>{total_un_read}</Text>
      </Flex>
    </GoMsg>
  );
};

export default FloatBtn;
