import React from 'react';
import { Icon } from 'components';
import { Box, Flex, Text } from 'uikit';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import useParsedQueryString from 'hooks/useParsedQueryString';

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
  list: Api.Tribe.TribeTopicInfo[];
  callBack?: (id: number) => void;
  mb?: string;
}> = ({ list, callBack, mb }) => {
  const { pathname } = useLocation();
  const qsValue = useParsedQueryString();
  const { replace } = useHistory();
  const TribeId = Number(qsValue.id);

  return (
    <Flex paddingTop='20px' alignItems='center' flexWrap='wrap'>
      {list?.length && (
        <>
          {list.map((item, index) => (
            <Btn
              mb={mb}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (Number(qsValue?.topic) === item.id) return;
                replace(
                  `${pathname}?id=${TribeId}&active=${
                    qsValue.active || 0
                  }&topic=${item.id}&topicName=${item.name}`,
                );
                callBack(Number(item.id));
              }}
              key={`${item.id}${index}`}
            >
              <Text fontSize='14px' color='textPrimary'>
                {item.name}
              </Text>
            </Btn>
          ))}
        </>
      )}
    </Flex>
  );
};

export default HotBtn;
