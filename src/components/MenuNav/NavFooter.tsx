import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Box, Flex } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { ProfileMenu } from './ProfileMenu';

export interface NavFooterProps {
  // seconds?: number
}


const User = styled(Flex)`
  display: block;
  margin-top: auto;
  flex: 1;
  flex-grow: inherit;
`;


const NavFooter: React.FC<NavFooterProps> = ({ }) => {
  const { t } = useTranslation()

  return (
    <Box mb="32px">
      <User as={Link} to="/me">
        <ProfileMenu />
      </User>
    </Box>
  )
}
export default NavFooter
