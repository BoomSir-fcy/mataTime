import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'components';
import { Flex } from 'uikit';

const Content = styled(Flex)`
  position: fixed;
  right: 5%;
  bottom: calc(12% + 40px + 20px);
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.gradients.buttonBg};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
`;

export const SendPost = React.memo(() => {
  return (
    <Content as={Link} to='/post'>
      <Icon name='icon-zhifeiji' />
    </Content>
  );
});
