export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Avarice",
  description:
    "A trading post for listing and finding rares in Diablo IV.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "List an item",
      href: "/new",
    }
  ],
  links: {
    twitter: "https://twitter.com/tomshawdev",
    github: "https://github.com/tomshaw650/avarice",
  },
}
