export interface MenuNavLink {
  path: string,
  icon: React.ReactElement,
  lable: string
  activeIcon?: React.ReactElement,
  coming?: boolean
  badge?: number
}

export interface MenuNavConfig extends MenuNavLink {
  children?: MenuNavLink[]
}