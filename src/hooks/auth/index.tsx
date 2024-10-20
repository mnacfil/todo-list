"use client";

import { onSignUpUser } from "@/actions/auth";
import { OtpSchema } from "@/app/(auth)/sign-up/_components/otp";
import { SignUpSchema } from "@/components/form/sign-up/schema";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";

export const useAuthSignUp = () => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [creating, setCreating] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();

  const signupform = useForm<z.infer<typeof SignUpSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const otpform = useForm<z.infer<typeof OtpSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    if (!isLoaded && !signUp) {
      toast("Error", { description: "Oops! something went wrong." });
      return;
    }
    try {
      if (values.email && values.password) {
        await signUp.create({
          emailAddress: values.email,
          password: values.password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      }
      setVerifying(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }
      toast("Error", { description: "Oops! something went wrong." });
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  };

  const onVerify = async (values: z.infer<typeof OtpSchema>) => {
    if (!isLoaded) {
      toast("Error", { description: "Oops! something went wrong." });
      return;
    }
    try {
      setCreating(true);
      const attempVerification = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });
      console.log(attempVerification);

      if (attempVerification.status !== "complete") {
        toast("Error", { description: "Oops! something went wrong." });
        return;
      }
      if (attempVerification.status === "complete") {
        const user = await onSignUpUser({
          firstname: signupform.getValues("firstName"),
          lastname: signupform.getValues("lastName"),
          email: signupform.getValues("email"),
          clerkId: signUp.createdUserId as string,
        });

        if (user.status === 201) {
          await setActive({ session: attempVerification.createdSessionId });
          toast("Success", { description: user.id });
          signupform.reset();
          otpform.reset();
          router.push("/app");
        }
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  };

  return {
    onSubmit,
    onVerify,
    creating,
    verifying,
    otpform,
    signupform,
    errors,
  };
};

export const useAuthLogin = () => {};
