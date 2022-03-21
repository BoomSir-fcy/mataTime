import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Icon } from 'components';
import { Card, Flex, Box, Text } from 'uikit';

const Content = styled(Box)``;

export const Collapse: React.FC<{
  mb?: string;
  title?: string;
  padding?: string;
  titleMb?: string;
  setIsClose?: (isClose) => void;
}> = React.memo(props => {
  const { setIsClose } = props;
  const [state, setState] = useImmer({
    visible: false,
  });

  const handleClick = () => {
    setState(p => {
      p.visible = !p.visible;
    });
  };

  return (
    <Card
      padding={props?.padding ? props?.padding : '16px'}
      isRadius
      onClick={() => (setIsClose ? setIsClose(state.visible) : {})}
      {...props}
    >
      <Flex
        padding={props?.padding ? '16px 16px 0' : '0'}
        justifyContent='space-between'
        alignItems='flex-end'
        mb={props?.titleMb ? props?.titleMb : '20px'}
      >
        <Text fontSize='18px' fontWeight='bold'>
          {props.title}
        </Text>
        <Icon name='icon-zhedie' current onClick={handleClick} />
      </Flex>
      {!state.visible && <Content>{props?.children}</Content>}
    </Card>
  );
});
