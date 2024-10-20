import Logo from "@/components/global/logo";
import AuthProvider from "@/provider/clerk-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen mx-auto  px-6  max-w-6xl">
      <div className="flex flex-col w-full h-full">
        <Logo />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
