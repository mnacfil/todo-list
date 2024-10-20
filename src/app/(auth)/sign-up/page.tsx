"use client";

import { SIGN_UP_IMAGES } from "@/components/constants/auth";
import SignUpForm from "@/components/form/sign-up";
import { Google } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthSignUp } from "@/hooks/auth";
import Image from "next/image";
import OtpForm from "./_components/otp";
import Link from "next/link";
import GoogleAuthButton from "@/components/global/google-auth-button";

const SignUp = () => {
  const authSignup = useAuthSignUp();
  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
      <div className="flex justify-between gap-10 w-full h-full">
        <div className="flex-1">
          <GoogleAuthButton method="sign-up" />
          <Separator className="my-4" />
          {authSignup.verifying ? (
            <OtpForm authOtp={authSignup} />
          ) : (
            <SignUpForm authSignup={authSignup} />
          )}
          <div className="mt-5">
            <p className="text-sm text-muted-foreground text-center">
              By continuing with Google or Email, you agree to Todoist&apos;s
              <br />
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
          <Separator className="my-4" />
          <Link
            href="/login"
            className="text-sm text-center w-full flex justify-center"
          >
            Already signed up?{" "}
            <span className="underline pl-1">Go to login</span>
          </Link>
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
