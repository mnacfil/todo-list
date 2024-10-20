"use client";

import { SIGN_UP_IMAGES } from "@/components/constants/auth";
import SignUpForm from "@/components/form/sign-up";
import { Google } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthSignUp } from "@/hooks/auth";
import Image from "next/image";
import Otp from "./_components/otp";

type Props = {};

const SignUp = (props: Props) => {
  const authSignup = useAuthSignUp();
  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
      <div className="flex justify-between gap-10 w-full h-full">
        <div className="flex-1">
          <Button
            className="w-full rounded-2xl flex items-center gap-2"
            variant="outline"
          >
            <Google />
            Continue with Google
          </Button>
          <Separator className="my-4" />
          {authSignup.verifying ? (
            <Otp authOtp={authSignup} />
          ) : (
            <SignUpForm authSignup={authSignup} />
          )}
          {authSignup.errors && (
            <ul>
              {authSignup.errors.map((err, i) => (
                <li key={i}>{err.longMessage}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-1 hidden lg:block h-full">
          <div className="grid grid-cols-2 gap-4">
            {SIGN_UP_IMAGES.map((item) => (
              <div className="flex flex-col gap-1" key={item.id}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={200}
                  height={200}
                  className="object-contain flex-1"
                />
                <div className="flex flex-col space-y-1 items-center w-full">
                  <h4>{item.label}</h4>
                  <p>{item.subLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
