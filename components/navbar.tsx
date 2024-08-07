import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { IconSmokingNo,IconBottle,IconMoodSad,IconPill ,IconListDetails,IconPresentationAnalytics ,IconUserPlus     } from '@tabler/icons-react';

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { Card } from "@nextui-org/card";

const BottomMenu = () => (
  <div className="fixed flex-row bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 sm:hidden flex justify-around py-3 bg-opacity-100">
    <Link href="/appraisal-registor" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors duration-300">
    <IconUserPlus stroke={2} />
      <span className="text-xs">ลงทะเบียน</span>
    </Link>
    <Link href="/risk" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors duration-300">
    <IconPill stroke={2} />
      <span className="text-xs">เบาหวาน</span>
    </Link>
    <Link href="/nicotine-test" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors duration-300">
    <IconSmokingNo stroke={2} />
  <span className="text-xs">นิโคติน</span>
</Link>
    <Link href="/suicide-form1" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors duration-300">
    <IconMoodSad stroke={2} />
      <span className="text-xs">ซึมเศร้า</span>
    </Link>
    <Link href="/alcohol-form" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors duration-300">
    <IconBottle stroke={2} />
      <span className="text-xs">แอลกอฮอลล์</span>
    </Link>
    <Link href="/assmnt-summary" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors duration-300">
    <IconPresentationAnalytics  stroke={2} />
      <span className="text-xs">ผลรวม</span>
    </Link>
  </div>
);



export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          {/* <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </NextLink>
          </NavbarBrand> */}
          <ul className=" flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
           
            <ThemeSwitch />
          </NavbarItem>
         
          
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <NextLink
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href={item.href}
                  // size="lg"
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <BottomMenu />
    </>
  );
};
