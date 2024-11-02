"use client";

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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();

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
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center space-x-1 cursor-pointer my-3">
            <CirclePlus className="w-6 h-6 ml-[-3px] fill-red-500 text-white" />
            <p className="text-sm font-semibold file:text-red-800">Add task</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          {/* <AddTask user={user} /> */}
          <p>Add task</p>
        </DialogContent>
      </Dialog>

      <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 rounded-sm">
        <Search className="w-4 h-4 opacity-50" />
        <p className="text-primary text-sm">Search</p>
      </div>
      <div className="flex flex-col w-full">
        {sidebarLinks.map((link) => {
          const isActive = link.href === pathname;
          return (
            <Link
              key={link.title}
              href={link.href}
              className={clsx(
                `flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm`,
                isActive ? "bg-orange-400/10" : "bg-none"
              )}
            >
              <div className="flex items-center space-x-2">
                <link.Icon
                  className={clsx(
                    "w-4 h-4 opacity-50",
                    isActive && "text-red-700"
                  )}
                />
                <p
                  className={clsx(
                    "text-primary text-sm",
                    isActive && "text-red-800"
                  )}
                >
                  {link.title}
                </p>
              </div>
              <p
                className={clsx(
                  "text-muted-foreground/50 text-sm",
                  isActive && "text-red-800"
                )}
              >
                3
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-sm font-semibold text-gray-500">Favorites</p>
        <div className="flex flex-col w-full space-y-3">
          {favoriteLinks.map((link) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm"
              >
                <div className="flex items-center space-x-2">
                  <link.Icon className="w-4 h-4 opacity-50" />
                  <p className="text-primary text-sm">{link.title}</p>
                </div>
                <p
                  className={clsx(
                    "text-muted-foreground/50 text-sm",
                    isActive && "text-red-800"
                  )}
                >
                  3
                </p>
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
        <div className="flex flex-col w-full">
          {projectsLinks.map((link) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.title}
                href={link.href}
                className={clsx(
                  `flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm`,
                  isActive ? "bg-orange-400/10" : "bg-none"
                )}
              >
                <div className="flex items-center space-x-2">
                  <link.Icon
                    className={clsx(
                      "w-4 h-4 opacity-50",
                      isActive && "text-red-700"
                    )}
                  />
                  <p
                    className={clsx(
                      "text-primary text-sm",
                      isActive && "text-red-800"
                    )}
                  >
                    {link.title}
                  </p>
                </div>
                <p
                  className={clsx(
                    "text-muted-foreground/50 text-sm",
                    isActive && "text-red-800"
                  )}
                >
                  3
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
