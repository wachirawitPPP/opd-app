export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Health-survey",
  description: "Health-survey: แบบประเมินสุขภาพออนไลน์",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "ลงทะเบียน",
      href: "/appraisal-registor",
    },
   
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
