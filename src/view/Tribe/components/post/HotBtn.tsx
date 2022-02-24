import React from 'react';
import { Icon } from 'components';
import { Box, Flex, Text } from 'uikit';
import styled from 'styled-components';

const Btn = styled(Flex)`
  width: max-content;
  padding: 0 14px;
  min-width: 78px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  cursor: pointer;
`;

const HotBtn: React.FC<{
  list: string[];
}> = ({ list }) => {
  return (
    <Flex paddingTop='20px' alignItems='center'>
      {list?.length && (
        <>
          {list.map((item, index) => (
            <Btn key={`${item}${index}`}>
              <Text fontSize='14px' color='textPrimary'>
                {item}
              </Text>
            </Btn>
          ))}
        </>
      )}
    </Flex>
  );
};

export default HotBtn;
