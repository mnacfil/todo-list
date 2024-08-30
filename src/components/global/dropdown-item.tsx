import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LucideProps, User } from "lucide-react";
import React from "react";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";

type Props = {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  shortcut: string;
};

const DropdownItem = ({ Icon, label, shortcut }: Props) => {
  return (
    <DropdownMenuItem>
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
      <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};

export default DropdownItem;
