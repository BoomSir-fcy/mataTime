import React from 'react';
import styled from 'styled-components';
import { Flex } from 'uikit';
import { SortIcon } from 'view/Post/components';

const Container = styled(Flex)`
  flex: 1;
  justify-content: flex-end;
  padding-top: 16px;
`;

export const Sortable: React.FC<{
  items: SortableItems[];
}> = ({ items }) => {
  return (
    <Container>
      {items?.map((row, index) => (
        <SortIcon
          key={index}
          text={row.text}
          changeSort={() => row.changeEvent()}
          flag={row.value}
        />
      ))}
    </Container>
  );
};
