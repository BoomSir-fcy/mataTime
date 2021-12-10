import React, { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Flex, Card, Box, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { List, AvatarCard, ContentParsing } from 'components';
import { Image } from 'uikit';
import { Api } from 'apis';
import {
  NoticeWrapper,
  NoticeItemWrapper,
  NoticeContentWrapper
} from './style';

const SystemAvatar = styled(Box)`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.card};
  background-color: #000000;
`;
const Content = styled(Box)`
  flex: 1;
`;
const PostContent = styled(Flex)`
  padding: 30px 0 30px 100px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const NewsNotice: React.FC = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);

  return (
    <NoticeWrapper>
      <NoticeContentWrapper>
        <List
          loading={page <= totalPage}
          renderList={() => {
            if (loading || page > totalPage) return false;
            setLoading(true);
            Api.NewsApi.getMessageList(5, page, 50).then(res => {
              setLoading(false);
              if (Api.isSuccess(res)) {
                setPage(page + 1);
                setListData([...listData, ...(res.data.list || [])]);
                setTotalPage(res.data.total_page);
              }
            });
          }}
        >
          {listData.map(item => (
            <NoticeItem key={item.id} itemData={item} />
          ))}
        </List>
      </NoticeContentWrapper>
    </NoticeWrapper>
  );
};

const NoticeItem: React.FC<{
  itemData;
}> = ({ itemData }) => {
  const { t } = useTranslation();
  return (
    <NoticeItemWrapper>
      <Flex justifyContent="space-between" padding="0 20px 25px 30px">
        <SystemAvatar mr="12px">
          <Image
            src={require('assets/images/system_logo.svg').default}
            width={60}
            height={60}
          />
        </SystemAvatar>
        <Content>
          <Text color="white_black" fontWeight="bold" fontSize="18px">
            {t('systemInformation')}
          </Text>
          <Text color="textTips" fontSize="14px" mt="10px" mb="15px">
            {dayjs(itemData.add_time).format(t('HH:mm:ss'))}
          </Text>
          <Text color="textTips">{itemData.msg_content}</Text>
        </Content>
      </Flex>
      <PostContent>
        <AvatarCard
          userName={itemData?.post?.nick_name}
          avatar={itemData?.post?.nft_image}
          address={itemData?.post?.user_address}
        />
        <ContentParsing content={itemData?.post?.content} />
      </PostContent>
    </NoticeItemWrapper>
  );
};

export default NewsNotice;
