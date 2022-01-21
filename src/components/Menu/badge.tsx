import React from 'react';
import styled from 'styled-components';
import { Text } from 'uikit';

const BadgeStyled = styled(Text)`
  position: absolute;
  right: 0;
  padding: 0 6px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.failure};
  border-radius: 5px;
  font-weight: 400;
  font-size: 12px;
`;

export const Badge: React.FC<{
  count: number | string;
}> = props => {
  let { count } = props;
  if (count > 99) {
    count = '+99';
  }
  return (
    <BadgeStyled color='white' {...props}>
      {count}
    </BadgeStyled>
  );
};
