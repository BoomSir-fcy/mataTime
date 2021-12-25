import React from 'react';
import { HelpIcon, useTooltip, Box, BoxProps, Placement } from 'uikit';
import styled from 'styled-components';

interface Props extends BoxProps {
  text: string | React.ReactNode;
  placement?: Placement;
  color?: string;
  iconWidth?: string;
  iconHeight?: string;
}

const QuestionWrapper = styled.div`
  vertical-align: middle;
  display: inline-block;
  :hover,
  :focus {
    opacity: 0.7;
  }
`;

const QuestionHelper: React.FC<Props> = ({
  text,
  color = 'white_black',
  placement = 'right-end',
  iconWidth = '16px',
  iconHeight = 'auto',
  ...props
}) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, {
    placement,
    trigger: 'hover',
  });

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        <HelpIcon color={color} width={iconWidth} height={iconHeight} />
      </QuestionWrapper>
    </Box>
  );
};

export default QuestionHelper;
