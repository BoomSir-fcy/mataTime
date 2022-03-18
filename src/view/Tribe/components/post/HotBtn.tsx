import React from 'react';
import { Icon } from 'components';
import { Box, Flex, Text } from 'uikit';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { useTranslation } from 'contexts/Localization';
import { useToast } from 'hooks';

const Btn = styled(Flex)`
  width: max-content;
  padding: 0 14px;
  min-width: 78px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  margin-top: 15px;
  cursor: pointer;
`;

const HotBtn: React.FC<{
  list: Api.Tribe.TribeTopicInfo[];
  callBack?: (id: number) => void;
  mb?: string;
}> = ({ list, callBack, mb }) => {
  const { t } = useTranslation();
  const { toastWarning } = useToast();
  const { pathname } = useLocation();
  const qsValue = useParsedQueryString();
  const { replace } = useHistory();
  const TribeId = Number(qsValue.id);
  const tribeDetailInfo = useTribeInfoById(qsValue.id);

  return (
    <Flex alignItems='center' flexWrap='wrap'>
      {list?.length && (
        <>
          {list.map((item, index) => (
            <Btn
              mb={mb}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (tribeDetailInfo?.status !== 4) {
                  toastWarning(t('Only clan members can search'));
                  return;
                }
                if (Number(qsValue?.topic) === item.id) return;
                replace(
                  `${pathname}?id=${TribeId}&active=${
                    qsValue.active || 0
                  }&topic=${item.id}&topicName=${item.name}`,
                );
                setTimeout(() => {
                  window.scrollTo({
                    // behavior: scrollState[pathname]?.y ? 'auto' : 'smooth',
                    behavior: 'auto',
                    top: 0,
                  });
                }, 0);
                callBack(Number(item.id));
              }}
              key={`${item.id}${index}`}
            >
              <Text ellipsis fontSize='14px' color='textPrimary'>
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
