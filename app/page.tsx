import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";

import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import HomeMenu from "@/components/home-menu";

export default function Home() {
  return (
    <div className="flex w-full flex-col mb-10">
      <HomeMenu/>
    </div>
  );
}
