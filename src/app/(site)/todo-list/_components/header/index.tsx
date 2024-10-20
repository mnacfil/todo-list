import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { SITE_LINKS } from "@/constants/site";
import { Ham, HamIcon, ListTodo, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import MobileHeader from "../mobile-header";
import Logo from "@/components/global/logo";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-between items-center py-5">
      <Logo />
      <MobileHeader />
      <div className="gap-3 items-center hidden lg:flex">
        <div className="flex gap-3 items-center">
          {SITE_LINKS.map((link) => (
            <>
              {link.hasMoreLinks ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="space-x-2 flex items-center">
                      {link.label}
                      {link.icon}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent>Hello World</HoverCardContent>
                </HoverCard>
              ) : (
                <Link
                  href={link.path}
                  className="flex space-x-2 items-center"
                  key={link.id}
                >
                  {link.label}
                  {link.icon}
                </Link>
              )}
            </>
          ))}
        </div>
        <Separator orientation="vertical" className="mx-3" color="red" />
        <div className="flex gap-2 items-center">
          <Link href="/login">Log in</Link>
          <Button type="button">Start for free</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
