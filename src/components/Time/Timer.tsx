import React from 'react'
import styled from 'styled-components'
import { Flex, Text, TextProps, HeadingScales, HeadingTags } from 'uikit'
import { useTranslation } from 'contexts/Localization'

export interface TimerProps extends TextProps {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
  months?: number
  years?: number
  color?: string
  itemMr?: string
  textMr?: string
}

const StyledTimerFlex = styled(Flex) <{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`

// interface StyledTimerTextProps extends HeadingProps {

// }

const StyledTimerText = styled(Text)`
  min-width: max-content;
  background: ${({ theme, color }) => {
    return color !== 'text' ? 'transparent' : theme.colors.gradients.gold
  }};
  ${({ color }) => (
    color !== 'text' ? '' : `
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    `
  )}
  /* TODO: 这个更改会对其他地方的组件有影响 没去做具体验证 */
  /* transform: translateY(-2px); */
`

export const Timer: React.FC<TimerProps> = ({
  minutes, seconds, hours, days, fontSize, color, bold,
  itemMr = '12px', textMr = '4px',
}) => {
  const { t } = useTranslation()

  return (
    <StyledTimerFlex alignItems="flex-end">
      {seconds === minutes && minutes === hours && hours === days && days === 0 && (
        <>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={textMr}>0</StyledTimerText>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={itemMr}>{t('s')}</StyledTimerText>
        </>
      )}
      {Boolean(days) && (
        <>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={textMr}>{days}</StyledTimerText>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={itemMr}>{t('d')}</StyledTimerText>
        </>
      )}
      {Boolean(hours) && (
        <>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={textMr}>{hours}</StyledTimerText>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={itemMr}>{t('h')}</StyledTimerText>
        </>
      )}
      {Boolean(minutes) && (
        <>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={textMr}>{minutes}</StyledTimerText>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={itemMr}>{t('m')}</StyledTimerText>
        </>
      )}
      {Boolean(seconds) && (
        <>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={textMr}>{seconds}</StyledTimerText>
          <StyledTimerText color={color} bold={bold} fontSize={fontSize} mr={itemMr}>{t('s')}</StyledTimerText>
        </>
      )}
    </StyledTimerFlex>
  )
}