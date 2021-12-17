import React from 'react'
import styled from 'styled-components';
import { Box, Text, Flex, Image } from 'uikit'

const BoxStyled = styled(Flex)`
  height: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`

interface MessageCardProps {
  avatar?: string
  title?: string
  date?: number

}

const MessageCard: React.FC<MessageCardProps> = ({
  avatar,
  title,
  date,
  children
}) => {
  return (
    <BoxStyled alignItems="center" justifyContent="space-between">
      <Flex flex="1" padding="16px">
        <Image
          src={require('assets/images/system_logo.svg').default}
          width={60}
          height={60}
          wrapperProps={{
            width: 30,
            height: 30,
          }}
        />
        <Flex ml="16px" flex="1">
          <Flex alignItems="center">
            <Text bold fontSize='18px' color="primary">big mama</Text>
            <Text ml="16px" fontSize='14px' color="textTips">12-16 10:10</Text>
          </Flex>
          <Box>
            {children}
          </Box>
        </Flex>
      </Flex>
      <Box height="100%" width="170px" background="pink">
        <Text>图片或内容</Text>
      </Box>
    </BoxStyled>
  )
}

export default MessageCard
