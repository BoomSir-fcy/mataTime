import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text, Button, BoxProps } from 'uikit';
import { useTranslation } from 'contexts/Localization';

const TabsBox = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

interface TabProps {
  lable?: string;
  tLable?: string;
  value?: string | number;
  width?: string;
  [key: string]: any;
}

export interface TabsProps extends BoxProps {
  keys: string;
  active?: string | number;
  datas: TabProps[];
  onChange: (tab: TabProps) => void;
  itemWidth?: string;
}

const Tabs: React.FC<TabsProps> = ({
  datas,
  active,
  keys,
  onChange,
  itemWidth = '70px',
  children,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <TabsBox {...props}>
      <Flex alignItems='baseline'>
        {datas.map(item => {
          return (
            <Button
              variant='text'
              key={item[keys]}
              padding='0'
              width={item.width || itemWidth}
              onClick={() => {
                if (item[keys] !== active) {
                  onChange(item);
                }
              }}
            >
              {item[keys] === active ? (
                <Text fontSize='18px' color='text' key={keys} bold>
                  {item.tLable ? t(item.tLable) : item.lable}
                </Text>
              ) : (
                <Text fontSize='14px' color='textTips'>
                  {item.tLable ? t(item.tLable) : item.lable}
                </Text>
              )}
            </Button>
          );
        })}
        {children}
      </Flex>
    </TabsBox>
  );
};

export default Tabs;
