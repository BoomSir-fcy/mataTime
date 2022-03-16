import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Icon } from 'components';
import { Card, Flex, Box, Text } from 'uikit';

const Content = styled(Box)``;

export const Collapse: React.FC<{
  mb?: string;
  title?: string;
}> = React.memo(props => {
  const [state, setState] = useImmer({
    visible: false,
  });

  const handleClick = () => {
    setState(p => {
      p.visible = !p.visible;
    });
  };

  return (
    <Card padding='16px' isRadius {...props}>
      <Flex justifyContent='space-between' alignItems='flex-end' mb='20px'>
        <Text fontSize='18px' fontWeight='bold'>
          {props.title}
        </Text>
        <Icon name='icon-zhedie' current onClick={handleClick} />
      </Flex>
      {!state.visible && <Content>{props?.children}</Content>}
    </Card>
  );
});
