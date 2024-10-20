"use client";

import { Google } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuthGoogle } from "@/hooks/auth";

type Props = {
  method: "sign-up" | "login";
};

const GoogleAuthButton = ({ method }: Props) => {
  const authGoogle = useAuthGoogle();
  return (
    <Button
      className="w-full rounded-2xl flex items-center gap-2"
      variant="outline"
      {...(method === "login"
        ? { onClick: () => authGoogle?.signInWith("oauth_google") }
        : {
            onClick: () => authGoogle?.signUpWith("oauth_google"),
          })}
    >
      <Google />
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;
