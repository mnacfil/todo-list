import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ListTodo, Menu, X } from "lucide-react";
import React from "react";

type Props = {};

const MobileHeader = (props: Props) => {
  return (
    <div className="lg:hidden block">
      <Drawer direction="bottom">
        <DrawerTrigger>
          <Menu className="cursor-pointer" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex w-full items-center justify-between">
            <Logo />
            <X className="cursor-pinter" />
          </div>
          <DrawerFooter>
            <Button variant={"ghost"}>Log in</Button>
            <Button variant={"destructive"}>Start for free</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileHeader;
