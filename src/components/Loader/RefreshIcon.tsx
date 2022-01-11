import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Spinner } from 'uikit';
import Container from '../Layout/Container';
import { Icon, iocnType } from '../Icon';
import { useTranslation } from 'contexts/Localization';

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

const Wrapper = styled(StyledPage)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(180deg)
    }
`;

const IconStyled = styled(Icon)`
  display: inline-block;
  cursor: pointer;
  transform-origin: center center;
  &.rotate {
    animation: ${rotate} 1s linear infinite;
  }
`;

interface RefreshIconProps extends Partial<iocnType> {
  onClick?: () => void;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({
  onClick,
  name,
  ...props
}) => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const handleClick = useCallback(() => {
    if (refresh) return;
    setRefresh(true);
    if (onClick) onClick();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, [refresh, setRefresh]);

  return (
    <IconStyled
      onClick={handleClick}
      className={refresh ? 'rotate' : ''}
      name={name || 'icon-jiazai_shuaxin'}
      {...props}
      title={t('recommendReload')}
    />
  );
};

export default RefreshIcon;
