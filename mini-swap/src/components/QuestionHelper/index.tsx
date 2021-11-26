import React from 'react'
import { HelpIcon, useTooltip, Box, BoxProps, Placement } from 'pancake-uikit'
import styled from 'styled-components'

interface Props extends BoxProps {
  text: string | React.ReactNode
  placement?: Placement
  color?: string
  trigger?: 'hover' | 'click'
}

const QuestionWrapper = styled.div`
  :hover,
  :focus {
    opacity: 0.7;
  }
`

const QuestionHelper: React.FC<Props> = ({ text, color = "textSubtle", trigger = 'hover', placement = 'right-end', ...props }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement, trigger })

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        <HelpIcon color={color} width="16px" />
      </QuestionWrapper>
    </Box>
  )
}

export default QuestionHelper
