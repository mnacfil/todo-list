"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  BookOpen,
  ChevronDown,
  CreditCard,
  Gift,
  LogOutIcon,
  Plus,
  Printer,
  RefreshCcw,
  Settings,
  Star,
  User,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

export const UserDropdown = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const onLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-gray-100 space-x-2">
          <Avatar>
            <AvatarImage
              src={user?.imageUrl ?? "https://github.com/shadcn.png"}
            />
            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
          <p>{user?.firstName + " " + user?.lastName}</p>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] ml-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>O then S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add a team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Activity className="mr-2 h-4 w-4" />
            <span>Activity log</span>
            <DropdownMenuShortcut>O then S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Printer className="mr-2 h-4 w-4" />
            <span>Print</span>
            <DropdownMenuShortcut>Ctrl P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Resources</span>
            <DropdownMenuShortcut>a</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Gift className="mr-2 h-4 w-4" />
          <span>What&apos;s new</span>
          <DropdownMenuShortcut>a</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Star className="mr-2 h-4 w-4" />
          <span>Upgrade to Pro</span>
          <DropdownMenuShortcut>a</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RefreshCcw className="mr-2 h-4 w-4" />
          <span>Sync</span>
          <DropdownMenuShortcut>1 hour ago</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Logout</span>
          <DropdownMenuShortcut>a</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
