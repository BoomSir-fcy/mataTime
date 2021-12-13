import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { Flex, Box, Card, Text } from 'uikit';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';
import { Icon } from 'components';
import { Api } from 'apis';

const HotTopicBox = styled(Card)`
  width: 300px;
  margin-top: 15px;
  padding: 20px 18px;
`;
const Hot = styled(Box)`
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.ThemeText};
  cursor: pointer;
  transition: all 0.1s ease;
  :hover {
    text-decoration: underline;
  }
`;
const HotCount = styled(Text)`
  text-align: right;
  color: ${({ theme }) => theme.colors.textgrey};
`;
const HeadAction = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s ease-out;
  i {
    &:hover {
      transform: rotate(90deg);
    }
  }
`;

const HotTopic: React.FC = () => {
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  const [page, setPage] = useState(1);
  const [hotTopicList, setHotTopicList] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    getList(false);
  }, []);

  const getList = isToast => {
    Api.HomeApi.queryHotTopic({ page }).then(res => {
      if (Api.isSuccess(res)) {
        setHotTopicList(res.data.List);
        if (isToast) {
          toastSuccess(t('HotTopicRefreshSuccess'));
        }
        if (page < res.data.total_page) {
          setPage(page + 1);
        } else {
          setPage(1);
        }
      }
    });
  };

  return (
    <HotTopicBox isBoxShadow isRadius>
      <HeadAction>
        <Text fontWeight="bold" fontSize="18px">
          {t('HotTopicTitle')}
        </Text>
        <Icon
          current={1}
          onClick={debounce(() => getList(true), 500)}
          name="icon-jiazai_shuaxin"
          margin="0"
          color={theme.colors.white_black}
        />
      </HeadAction>
      <Flex justifyContent="space-between" flexDirection="column">
        {hotTopicList.map((item, index) => (
          <Flex
            key={`${item.tid}_${index}`}
            mt="20px"
            justifyContent="space-between"
          >
            <Hot as={Link} to={`/topicList/${item.tid}/${item.topic_name}`}>
              #{item.topic_name}#
            </Hot>
            <HotCount>
              {t('HotTopicUnit', {
                value: item.post_num > 999 ? '999+' : item.post_num
              })}
            </HotCount>
          </Flex>
        ))}
      </Flex>
    </HotTopicBox>
  );
};

export default HotTopic;
