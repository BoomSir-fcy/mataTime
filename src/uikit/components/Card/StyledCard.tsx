import styled, { DefaultTheme } from 'styled-components';
import { space } from 'styled-system';
import { CardProps } from './types';

interface StyledCardProps extends CardProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success --> Active
 */
const getBoxShadow = ({
  isActive,
  isSuccess,
  isWarning,
  isBoxShadow,
  isShadow,
  theme
}: StyledCardProps) => {
  if (isWarning) {
    return theme.card.boxShadowWarning;
  }

  if (isSuccess) {
    return theme.card.boxShadowSuccess;
  }

  if (isActive) {
    return theme.card.boxShadowActive;
  }

  if (isShadow) {
    return theme.card.boxShadow;
  }

  if (isBoxShadow) {
    return 'none';
  }

  return 'none';
};

const getBorderRadius = ({ isRadius, theme }: StyledCardProps) => {
  return isRadius ? theme.radii.card : 0;
};

const StyledCard = styled.div<StyledCardProps>`
  background-color: ${({ theme }) => theme.card.background};
  border: ${({ theme }) => theme.radii.card};
  border-radius: ${getBorderRadius};
  box-shadow: ${getBoxShadow};
  color: ${({ theme, isDisabled }) =>
    theme.colors[isDisabled ? 'textDisabled' : 'text']};
  overflow: hidden;
  ${space}
`;

StyledCard.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
  isBoxShadow: false,
  isShadow: false,
  isRadius: false
};

export default StyledCard;
