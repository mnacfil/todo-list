"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import React, { ReactNode, useState } from "react";

type Props = {
  label: string;
  subLabel: string;
  children: ReactNode;
};

const HideAndShow = ({ children, label, subLabel }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex gap-2 w-full">
      <ChevronRight
        size={18}
        className={`cursor-pointer text-gray-500 transition-all mt-[2.5px] ${clsx(
          {
            "rotate-90": open,
          }
        )}`}
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        className={`flex flex-col w-full transition-all ${clsx({
          "gap-2": !open,
        })}`}
      >
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <p className="text-xs">{label} </p>
          <span className="text-muted-foreground text-[10px]">{subLabel}</span>
        </div>
        {open && children}
        {!open && <Separator />}
      </div>
    </div>
  );
};

export default HideAndShow;
