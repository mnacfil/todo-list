import React, { ReactNode } from "react";
import Header from "./_components/header";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="w-full h-screen overflow-y-auto mx-auto max-w-screen-2xl">
      <div className="flex flex-col px-4 md:px-10 h-full">
        <Header />
        {children}
      </div>
    </main>
  );
};

export default layout;
