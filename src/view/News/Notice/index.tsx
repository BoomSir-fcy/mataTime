import React, { useState, useMemo } from 'react';
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
  NoticeContentWrapper,
} from './style';
import { MessageType } from './type';
import { Link } from 'react-router-dom';

const SystemAvatar = styled(Box)`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.card};
  background-color: ${({ theme }) => theme.colors.backgroundThemeCard};
`;
const Content = styled(Box)`
  flex: 1;
  a {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
const PostContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding: 30px 10px 30px 100px;
  background-color: ${({ theme }) => theme.colors.backgroundThemeCard};
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
  const { t, getHTML } = useTranslation();
  const { type } = itemData;

  const ruleUrl = `${window.location.origin}/content-rules/index.html`;

  const noticeContent = useMemo(() => {
    if (type === MessageType.MessageSystemRechargeSuccess) {
      const content = JSON.parse(itemData.msg_content);
      return (
        <>
          {t('Deposit Successfully')}
          <Text color='textTips'>
            {t('DepositSuccessfullyDetail', {
              value: `${content?.amount} ${content?.coin_type?.toUpperCase()}`,
              time: dayjs(itemData.add_time).format(t('YYYY-MM-DD HH:mm:ss')),
            })}
          </Text>
        </>
      );
    }
    if (type === MessageType.MessageSystemRewardSuccess) {
      const content = JSON.parse(itemData.msg_content);
      return (
        <>
          {t('Tip Successfully')}
          <Text color='textTips'>
            {t('TipSuccessfullyDetail', {
              value: `${content?.amount} ${content?.coin_type?.toUpperCase()}`,
              time: dayjs(itemData.add_time).format(t('YYYY-MM-DD HH:mm:ss')),
            })}
          </Text>
        </>
      );
    }
    if (type === MessageType.MessageSystemWithdrawalSuccess) {
      const content = JSON.parse(itemData.msg_content);
      return (
        <>
          {t('Withdraw Successfully')}
          <Text color='textTips'>
            {t('WithdrawSuccessfullyDetail', {
              value: `${content?.amount} ${content?.coin_type?.toUpperCase()}`,
              time: dayjs(itemData.add_time).format(t('YYYY-MM-DD HH:mm:ss')),
            })}
          </Text>
        </>
      );
    }
    if (type === MessageType.MessageSystemAddTag) {
      return t('AddUserTag', { value: JSON.parse(itemData.msg_content) });
    }
    if (type === MessageType.MessageSystemUpdateTag) {
      const content = JSON.parse(itemData.msg_content);
      return t('EditUserTag', {
        beforeValue: content?.before_name,
        afterValue: content?.after_name,
      });
    }
    if (type === MessageType.MessageSystemDeleteTag) {
      return t('DeleteUserTag', { value: JSON.parse(itemData.msg_content) });
    }
  }, [type]);
  return (
    <NoticeItemWrapper>
      <Flex justifyContent='space-between' padding='0 20px 25px 30px'>
        <SystemAvatar mr='12px'>
          <Image
            src={require('assets/images/system_logo.svg').default}
            width={60}
            height={60}
          />
        </SystemAvatar>
        <Content>
          <Text color='white_black' fontWeight='bold' fontSize='18px'>
            {t('systemInformation')}
          </Text>
          <Text color='textTips' fontSize='14px' mt='10px' mb='15px'>
            {dayjs(itemData.add_time).format(t('MM-DD HH:mm'))}
          </Text>
          <Text color='textTips'>
            {type === MessageType.MessageSystemMute &&
              getHTML('settingNotificationText1', {
                value: `<a href="${ruleUrl}" target="_blank">${t(
                  'latformReviewRules',
                )}</a>`,
              })}
            {type === MessageType.MessageSystemUnMute &&
              getHTML('settingNotificationText2', {
                value: `<a href="${ruleUrl}" target="_blank">${t(
                  'latformReviewRules',
                )}</a>`,
              })}
            {type === MessageType.MessageSystemShieldPost &&
              getHTML('settingNotificationText3', {
                value: `<a href="${ruleUrl}" target="_blank">${t(
                  'latformReviewRules',
                )}</a>`,
              })}
            {noticeContent}
          </Text>
        </Content>
      </Flex>
      {itemData?.post?.user_address && (
        <PostContent as={Link} to={`/articleDetils/${itemData.post?.post_id}`}>
          <AvatarCard
            userName={itemData?.post?.nick_name}
            avatar={itemData?.post?.nft_image}
            address={itemData?.post?.user_address}
          />
          <Box mt='14px'>
            <ContentParsing content={itemData?.post?.content} />
          </Box>
        </PostContent>
      )}
    </NoticeItemWrapper>
  );
};

export default NewsNotice;
