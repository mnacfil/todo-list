import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelRight } from "lucide-react";
import React from "react";
import { UserDropdown } from "./user-dropdown";

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
    </>
  );
};

export default Sidebar;
