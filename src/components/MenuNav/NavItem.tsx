import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { Icon } from 'components';
import { useToast } from 'hooks';
import { Box, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { MenuNavLink } from './type';
import { NavItemStyled, IconBox, Badge } from './styled';
import useMenuNav from 'hooks/useMenuNav';

export interface NavItemProps extends MenuNavLink {
  pathname: string;
  childrenLen?: number;
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

  const collapse = () => {
    setIsPushed(pre => (pre ? false : pre));
  };
  if (hide) return null;
  if (coming) {
    return (
      <NavItemStyled onClick={() => toastInfo(t('Coming Soon!'))}>
        <IconBox>
          {/* {icon} */}
          <Icon name={icon} color={isActive ? 'white_black' : 'textSubtle'} />
          {typeof badge === 'number' && (
            <Badge color='white'>{badgeDispaly}</Badge>
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
      isactive={isActive ? 1 : 0}
      as={Link}
      to={path}
      onClick={collapse}
    >
      <IconBox>
        {/* {isActive ? (activeIcon || icon) : icon} */}
        <Icon
          name={isActive ? activeIcon || icon : icon}
          color={isActive ? 'white_black' : 'textSubtle'}
        />
        {typeof badge === 'number' && (
          <Badge color='white'>{badgeDispaly}</Badge>
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
};
export default NavItem;
