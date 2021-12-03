import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Text, TextProps } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { Icon } from '../Icon'

interface RewardAuthProps {

}

export const RewardAuthTag: React.FC<RewardAuthProps> = ({ }) => {
  const { t } = useTranslation()

  return (
    <Flex alignItems="center">
      <Icon color="red" name="icon-dashang" />
      36
    </Flex>
  )
}

export default RewardAuthTag
