import React from 'react'
import styled from 'styled-components'
import { Icon } from 'components'
import { Link } from 'react-router-dom';
import { Circle } from 'rc-progress';
import { Box, Flex, Text, Image } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { ProfileMenu } from './ProfileMenu';
import Shalou from './Shalou'

export interface NavFooterProps {
  // seconds?: number
}


const User = styled(Flex)`
  display: block;
  margin-top: auto;
  flex: 1;
  flex-grow: inherit;
`;

const TimeInfoBox = styled(Flex)`
  width: 100%;
  height: 110px;
  background: ${({ theme }) => theme.colors.backgroundMenu};
  padding-left: 12px;
`

const strokeWidth = 8

const DownTimeBox = styled(Box)`
  position: absolute;
  width: ${100 - strokeWidth * 2}%;
  height: ${100 - strokeWidth * 2}%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  top: ${strokeWidth}%;
  left: ${strokeWidth}%;
`

const NavFooter: React.FC<NavFooterProps> = ({ }) => {
  const { t } = useTranslation()

  return (
    <Box mb="32px">
      <TimeInfoBox flexDirection="column" justifyContent="center">
        <Flex alignItems="center">
          <Box position="relative" width="33px" height="33px">
            <Circle percent={50} strokeWidth={strokeWidth} trailWidth={strokeWidth} strokeColor="#6685f1" />
            <DownTimeBox>
              <Shalou />
            </DownTimeBox>
          </Box>
          <Box ml="16px">
            <Text color="textTips" fontSize="14px">今日燃烧</Text>
            <Text color="white_black" fontSize="14px">88.254</Text>
          </Box>
        </Flex>
        <Flex mt="8px" alignItems="center">
          <Box width="33px" height="33px">
            <Image src="/images/tokens/TIME.svg" width={37} height={37} />
          </Box>
          <Box ml="16px">
            <Text color="textTips" fontSize="14px">今日燃烧</Text>
            <Text color="white_black" fontSize="14px">88.254</Text>
          </Box>
        </Flex>
      </TimeInfoBox>
      <User as={Link} to="/me">
        <ProfileMenu />
      </User>
    </Box>
  )
}
export default NavFooter
