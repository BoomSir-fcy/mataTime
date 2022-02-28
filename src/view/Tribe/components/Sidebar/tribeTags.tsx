import React from 'react';
import styled from 'styled-components';
import { Card, Flex, Text } from 'uikit';

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
  margin-bottom: 15px;
  cursor: pointer;
`;

const Tags: React.FC<{
  list: string[];
}> = ({ list }) => {
  return (
    <Flex alignItems='center' flexWrap='wrap'>
      {list.length && (
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

const TribeTags = ({ ...props }) => {
  return (
    <Card padding='16px' isRadius {...props}>
      <Text mb='20px' fontSize='18px' fontWeight='bold'>
        部落主题热点
      </Text>
      <Tags list={['Web3.0', '555555555', '2', '333', '1']} />
    </Card>
  );
};

export default TribeTags;
