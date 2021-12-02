export interface MenuNavLink {
  path: string,
  // icon: React.ReactElement,
  icon: string,
  lable: string
  activeIcon?: string,
  coming?: boolean
  badge?: number
}

export interface MenuNavConfig extends MenuNavLink {
  children?: MenuNavLink[]
}