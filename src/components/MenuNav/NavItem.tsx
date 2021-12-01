import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'
import { Icon } from 'components';
import { useToast } from 'hooks'
import { Box, Flex, Text } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { MenuNavLink } from './type'
import { NavItemStyled, IconBox, Badge } from './styled'

export interface NavItemProps extends MenuNavLink {
  pathname: string
}

const NavItem: React.FC<NavItemProps> = ({ path, icon, lable, badge, coming, activeIcon, pathname }) => {
  const { t } = useTranslation()
  const { toastInfo } = useToast();

  const badgeDispaly = useMemo(() => {
    return badge > 99 ? `+${badge}` : `${badge}`
  }, [badge])

  const isActive = useMemo(() => {
    return pathname === path && !coming
  }, [pathname, path])

  if (coming) {
    return (
      <NavItemStyled onClick={() => toastInfo(t('Coming Soon!'))} mt="1px" alignItems="center" padding="28px 14px">
        <IconBox>
          {icon}
          { typeof badge === 'number' && <Badge>{badgeDispaly}</Badge> }
        </IconBox>
        <Text ml="20px" fontSize="18px" bold={isActive} color={isActive ? 'white_black' : 'textSubtle' } >{t(lable)}</Text>
      </NavItemStyled>
    )  
  }
  return (
    <NavItemStyled active={isActive} as={Link} to={path} mt="1px" alignItems="center" padding="28px 14px">
      <IconBox>
        { isActive ? (activeIcon || icon) : icon}
        { typeof badge === 'number' && <Badge>{badgeDispaly}</Badge> }
      </IconBox>
      <Text ml="20px" fontSize="18px" bold={isActive} color={isActive ? 'white_black' : 'textSubtle' } >{t(lable)}</Text>
    </NavItemStyled>
  )
}
export default NavItem
