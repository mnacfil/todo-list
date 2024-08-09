import Sidebar from "@/components/layout/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="h-screen w-full flex">
      <div className="w-[300px] h-screen bg-slate-400">
        <Sidebar />
      </div>
      <div className="flex-1 mx-auto max-w-screen-lg h-full">{children}</div>
    </main>
  );
};

export default layout;
