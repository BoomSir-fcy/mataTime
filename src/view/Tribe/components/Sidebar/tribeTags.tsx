import React from 'react';
import styled from 'styled-components';
import { Card, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { useHistory } from 'react-router-dom';
import { useToast } from 'hooks';
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
  margin-bottom: 15px;
  cursor: pointer;
`;

const Tags: React.FC<{
  list: Api.Tribe.TopicInfo[];
}> = ({ list }) => {
  const { replace } = useHistory();
  const { t } = useTranslation();
  const { toastWarning } = useToast();
  const qsValue = useParsedQueryString();
  const tribeDetailInfo = useTribeInfoById(qsValue.id);

  return (
    <Flex alignItems='center' flexWrap='wrap'>
      {list?.length > 0 && (
        <>
          {list?.map((item, index) => (
            <Btn
              onClick={() => {
                if (tribeDetailInfo?.status !== 4) {
                  toastWarning(t('Only clan members can search'));
                  return;
                }
                replace(
                  `/tribe/detail?id=${item.tribe_id}&topic=${item.id}&topicName=${item.topic}`,
                );
              }}
              key={`${item}${index}`}
            >
              <Text fontSize='14px' color='textPrimary' ellipsis>
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
    <>
      {tribeInfo?.topics?.length > 0 && (
        <Card padding='16px' isRadius {...props}>
          <Text mb='20px' fontSize='18px' fontWeight='bold'>
            {t('TribeTagsTitle')}
          </Text>
          <Tags list={tribeInfo?.topics?.slice(0, 7) ?? []} />
        </Card>
      )}
    </>
  );
};

export default React.memo(
  TribeTags,
  (prev, next) => prev.tribe_id === next.tribe_id,
);
