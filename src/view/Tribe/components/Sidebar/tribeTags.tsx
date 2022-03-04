import React from 'react';
import styled from 'styled-components';
import { Card, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { useTribeInfoById } from 'store/mapModule/hooks';

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
  list: any[];
}> = ({ list }) => {
  return (
    <Flex alignItems='center' flexWrap='wrap'>
      {list.length > 0 && (
        <>
          {list.map((item, index) => (
            <Btn key={`${item}${index}`}>
              <Text fontSize='14px' color='textPrimary'>
                {item.topic}
              </Text>
            </Btn>
          ))}
        </>
      )}
    </Flex>
  );
};

const TribeTags: React.FC<{
  tribe_id: number;
  mb: string;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const tribeInfo = useTribeInfoById(props.tribe_id);

  return (
    <Card padding='16px' isRadius {...props}>
      <Text mb='20px' fontSize='18px' fontWeight='bold'>
        {t('TribeTagsTitle')}
      </Text>
      <Tags list={tribeInfo?.topics ?? []} />
    </Card>
  );
};

export default TribeTags;
