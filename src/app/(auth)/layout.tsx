import Logo from "@/components/global/logo";
import AuthProvider from "@/provider/clerk-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen mx-auto max-w-6xl px-4 lg:px-0">
      <div className="flex flex-col w-full h-full">
        <Logo />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-3/5 w-full">
            <ClerkProvider>{children}</ClerkProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
