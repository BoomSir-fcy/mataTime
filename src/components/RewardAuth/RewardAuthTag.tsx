import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text, TextProps } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { Icon } from '../Icon'
import useRewardAuth from 'contexts/RewardAuthContext/hooks/useRewardAuth'

interface RewardAuthProps {

}

const RewardAuthTagStyled = styled(Flex)`
  cursor: pointer;
`

export const RewardAuthTag: React.FC<RewardAuthProps> = ({ }) => {
  const { t } = useTranslation()
  const { setVisible } = useRewardAuth()
  // console.log(1)

  const handleMounsEnter = useCallback((event) => {
    console.log(event)
    setVisible(true)
  }, [])
  const handleMounsLevel = useCallback((event) => {
    setVisible(false)
  }, [])
  return (
    <RewardAuthTagStyled
      alignItems="center"
      onMouseEnter={handleMounsEnter}
      onMouseLeave={handleMounsLevel}
    >
      <Icon color="red" name="icon-dashang" />
      36
    </RewardAuthTagStyled>
  )
}

export default RewardAuthTag
