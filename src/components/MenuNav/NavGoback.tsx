import React from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from 'components';
import { Text } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { NavItemStyled, IconBox } from './styled'

const NavGoback: React.FC = () => {
  const { t } = useTranslation()
  const { goBack, push } = useHistory()

  return (
    <NavItemStyled onClick={() => push('/')} mt="1px" alignItems="center" padding="28px 14px">
      <IconBox><Icon color="textSubtle" name="icon-fanhui" /></IconBox>
      <Text ml="20px" fontSize="18px" bold color="white_black" >{t('newsBack')}</Text>
    </NavItemStyled>
  )
}
export default NavGoback
