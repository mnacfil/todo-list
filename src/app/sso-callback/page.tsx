import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import React from "react";

type Props = {};

const SSOCallback = (props: Props) => {
  return <AuthenticateWithRedirectCallback />;
};

export default SSOCallback;
