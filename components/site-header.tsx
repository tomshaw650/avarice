import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoginButton } from "./buttons"
import { UserDropdown } from "./user-dropdown"

import { getCurrentUser } from "@/lib/session"

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {user && user.image ?
            <UserDropdown user={user} />
            : <LoginButton />}
          </nav>
        </div>
      </div>
    </header>
  )
}