"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import React, { ReactNode, useState } from "react";

type Props = {
  label: string;
  children: ReactNode;
  total: number;
  count?: number;
};

const HideAndShow = ({ children, label, total, count }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex gap-2 w-full">
      <ChevronRight
        size={20}
        className={`cursor-pointer transition-all mt-[2.5px] ${clsx({
          "rotate-90": open,
        })}`}
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
          <p>{label} </p>
          <span>{count ? `${count}/${total}` : total}</span>
        </div>
        {open && children}
        {!open && <Separator />}
      </div>
    </div>
  );
};

export default HideAndShow;
