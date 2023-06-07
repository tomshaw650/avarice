import { NavItem } from "./nav"

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      // items: NavLink[]
    }
)

export type ProfileConfig = {
  sidebarNav: SidebarNavItem[]
}