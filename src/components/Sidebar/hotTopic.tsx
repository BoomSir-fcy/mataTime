import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Box, Card, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Avatar, Icon } from 'components';
import { Api } from 'apis';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const HotTopicBox = styled(Card)`
  width: 300px;
  margin-top: 15px;
  padding: 20px 18px;
`;
const Hot = styled.span`
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  color: ${({ theme }) => (theme.isDark ? '#7393FF' : '#4168ED')};
  cursor: pointer;
  :hover {
    text-decoration: underline;
    transition: all 0.3s;
  }
`;
const HotCount = styled.span`
  font-size: 16px;
  text-align: right;
  color: ${({ theme }) => (theme.isDark ? '#B5B5B5' : '#7A83A0')};
`;

const HotTopic: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [hotTopicList, setHotTopicList] = useState([]);

  useEffect(() => {
    getList(false);
  }, []);

  const getList = isToast => {
    Api.HomeApi.queryHotTopic({ page }).then(res => {
      if (Api.isSuccess(res)) {
        setHotTopicList(res.data.List);
        if (isToast) {
          toast.success(t('HotTopicRefreshSuccess'));
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
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="18px">
          {t('HotTopicTitle')}
        </Text>
        <Icon
          current={1}
          onClick={getList.bind(this, true)}
          name="icon-jiazai_shuaxin"
          margin="0"
          color="#7393FF"
        />
      </Flex>
      <Flex justifyContent="space-between" flexDirection="column">
        {hotTopicList.map((item, index) => (
          <Flex
            key={`${item.tid}_${index}`}
            mt="20px"
            justifyContent="space-between"
          >
            <Hot>
              <Link to={`/topicList/${item.tid}/${item.topic_name}`}>
                #{item.topic_name}#
              </Link>
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
