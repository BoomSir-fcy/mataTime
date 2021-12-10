import { useContext } from 'react'
import { MenuNavContent } from 'contexts/MenuNavContent'

const useMenuNav = () => {
  const menuNavContent = useContext(MenuNavContent)
  return menuNavContent
}

export default useMenuNav
