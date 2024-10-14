"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AuthProvider;
