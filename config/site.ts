export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Diablozon",
  description:
    "A site for listing and finding rares in Diablo IV.",
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
    github: "https://github.com/tomshaw650/diablozon",
  },
}
