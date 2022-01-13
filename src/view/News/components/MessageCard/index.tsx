import React from 'react';
import styled from 'styled-components';
import { Box, Text, Flex, Image } from 'uikit';
import { ImgList, ContentParsing, Avatar } from 'components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';

const BoxStyled = styled(Flex)`
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const ContentBox = styled(Box)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 170px;
  }
`;
const ContentInnerBox = styled(Box)`
  pointer-events: none;
  padding: 14px 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 14px 8px 0;
  }
`;

const ContentBoxEllipsis = styled(Box)`
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: nowrap;
`;

interface MessageCardProps {
  uid?: number;
  avatar?: string;
  title?: string;
  date?: string;
  content?: string;
  href?: string;
  content_status?: number;
  image_list?: string[];
}

const MessageCard: React.FC<MessageCardProps> = ({
  uid,
  avatar,
  title,
  date,
  image_list,
  content,
  href,
  content_status,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <BoxStyled>
      <Flex flex='1' padding='16px'>
        <Avatar uid={uid} src={avatar} scale='md' />
        <Flex flexDirection='column' ml='16px' flex='1'>
          <Flex alignItems='baseline'>
            <Text maxWidth='100px' ellipsis bold fontSize='18px'>
              {title}
            </Text>
            <Text ellipsis ml='16px' fontSize='14px' color='textTips'>
              {date}
            </Text>
          </Flex>
          <Box>{children}</Box>
        </Flex>
      </Flex>
      {content_status === 1 ? (
        <ContentBox as={href ? Link : undefined} to={href} height='100%'>
          <ContentInnerBox>
            {image_list?.length ? (
              <ImgList list={image_list} />
            ) : (
              <ContentBoxEllipsis>
                <ContentParsing content={content} />
              </ContentBoxEllipsis>
            )}
          </ContentInnerBox>
        </ContentBox>
      ) : (
        <ContentBox height='100%'>
          <Text color='textTips' fontSize='14px' padding='8px'>
            {content_status === 2 && t('The post has been deleted')}
            {content_status === 3 && t('The post has been blocked')}
          </Text>
        </ContentBox>
      )}
    </BoxStyled>
  );
};

export default MessageCard;
