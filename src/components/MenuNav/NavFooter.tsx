import React from 'react'
import styled from 'styled-components'
import { Box, Text } from 'uikit'
import { useTranslation } from 'contexts/Localization'

export interface NavFooterProps {
  // seconds?: number
}

const NavFooter: React.FC<NavFooterProps> = ({  }) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Text>
        NavFooter
      </Text>
    </Box>
  )
}
export default NavFooter
