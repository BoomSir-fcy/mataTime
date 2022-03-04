import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { Icon } from 'components';
import { useToast } from 'hooks';
import { Box, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { MenuNavLink } from './type';
import { NavItemStyled, IconBox, Badge, BadgeIcon } from './styled';
import useMenuNav from 'hooks/useMenuNav';

export interface NavItemProps extends MenuNavLink {
  pathname: string;
  childrenLen?: number;
  badgeIcon?: string;
  disabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  path,
  icon,
  lable,
  badge,
  coming,
  hide,
  activeIcon,
  pathname,
  markPath,
  childrenLen,
  badgeIcon,
  disabled,
  ...props
}) => {
  const { t } = useTranslation();
  const { toastInfo } = useToast();
  const { setIsPushed } = useMenuNav();

  const badgeDispaly = useMemo(() => {
    return badge > 99 ? `+99` : `${badge}`;
  }, [badge]);

  const isActive = useMemo(() => {
    return Boolean(
      (pathname === path || markPath?.includes(pathname)) && !coming,
    );
  }, [pathname, markPath, path]);

  if (hide) return null;
  if (coming) {
    return (
      <NavItemStyled
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            toastInfo(t('Coming Soon!'));
          }
        }}
      >
        <IconBox>
          {/* {icon} */}
          <Icon name={icon} color={isActive ? 'white_black' : 'textSubtle'} />
          {typeof badge === 'number' && (
            <Badge color='white'>{badgeDispaly}</Badge>
          )}
          {badgeIcon && (
            <BadgeIcon name={badgeIcon} size={16} color='textOrigin' />
          )}
        </IconBox>
        <Text
          ml='20px'
          fontSize='18px'
          bold={isActive}
          color={isActive ? 'white_black' : 'textSubtle'}
        >
          {t(lable)}
        </Text>
      </NavItemStyled>
    );
  }
  return (
    <NavItemStyled
      disabled={disabled}
      isactive={isActive ? 1 : 0}
      as={disabled ? null : Link}
      to={path}
      onClick={() => {
        if (!disabled) {
          setIsPushed(pre => (pre ? false : pre));
        }
      }}
    >
      <IconBox>
        {/* {isActive ? (activeIcon || icon) : icon} */}
        {/* textDisabled */}
        <Icon
          name={isActive ? activeIcon || icon : icon}
          color={
            isActive ? 'white_black' : disabled ? 'textDisabled' : 'textSubtle'
          }
        />
        {typeof badge === 'number' && (
          <Badge color='white'>{badgeDispaly}</Badge>
        )}
        {badgeIcon && (
          <BadgeIcon name={badgeIcon} size={16} color='textOrigin' />
        )}
      </IconBox>
      <Text
        ml='20px'
        fontSize='18px'
        bold={isActive}
        color={
          isActive ? 'white_black' : disabled ? 'textDisabled' : 'textSubtle'
        }
      >
        {t(lable)}
      </Text>
    </NavItemStyled>
  );
};
export default NavItem;
