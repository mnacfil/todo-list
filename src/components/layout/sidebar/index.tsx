import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CirclePlus, PanelRight, Plus, PlusCircle, Search } from "lucide-react";
import React from "react";
import { UserDropdown } from "./user-dropdown";
import {
  favoriteLinks,
  projectsLinks,
  sidebarLinks,
} from "@/components/constants/sidebar";
import Link from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <UserDropdown />
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <PanelRight className="w-4 h-4 opacity-50 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[300px]" side="left">
              <SheetHeader>
                <SheetTitle>My Name</SheetTitle>
              </SheetHeader>
              <div>More Content</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex items-center space-x-1 cursor-pointer my-3">
        <CirclePlus className="w-6 h-6 ml-[-3px] fill-red-500 text-white" />
        <p className="text-sm font-semibold file:text-red-800">Add task</p>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer mb-2">
        <Search className="w-4 h-4 opacity-50" />
        <p className="text-primary text-sm">Search</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        {sidebarLinks.map((link) => {
          return (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <link.Icon className="w-4 h-4 opacity-50" />
                <p className="text-primary text-sm">{link.title}</p>
              </div>
              <p className="text-muted-foreground/50 text-sm">3</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-sm font-semibold text-gray-500">Favorites</p>
        <div className="flex flex-col w-full space-y-3">
          {favoriteLinks.map((link) => {
            return (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center justify-between pl-2 pr-1 py-1 hover:bg-gray-100 rounded-sm"
              >
                <div className="flex items-center space-x-2">
                  <link.Icon className="w-4 h-4 opacity-50" />
                  <p className="text-primary text-sm">{link.title}</p>
                </div>
                <p className="text-muted-foreground/50 text-sm">3</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold text-gray-500">My Projects</p>
          <span className="text-xs text-gray-500 p-[2px] bg-gray-100 rounded-sm font-semibold">
            USED: 5/5
          </span>
        </div>
        <div className="flex flex-col w-full space-y-3">
          {projectsLinks.map((link) => {
            return (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center justify-between pl-2 pr-1 py-1 hover:bg-gray-100 rounded-sm"
              >
                <div className="flex items-center space-x-2">
                  <link.Icon className="w-4 h-4 opacity-50" />
                  <p className="text-primary text-sm">{link.title}</p>
                </div>
                <p className="text-muted-foreground/50 text-sm">3</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
