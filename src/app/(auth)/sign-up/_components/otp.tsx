"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuthSignUp } from "@/hooks/auth";
import { z } from "zod";

type Props = {
  authOtp: Pick<
    ReturnType<typeof useAuthSignUp>,
    "onVerify" | "otpform" | "creating" | "errors"
  >;
};

export const OtpSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters" }),
});

const OtpForm = ({ authOtp }: Props) => {
  const { otpform, creating, errors, onVerify } = authOtp;

  return (
    <div className="h-full flex justify-center ">
      <Form {...otpform}>
        <form
          onSubmit={otpform.handleSubmit(onVerify)}
          className="flex justify-center flex-col gap-2"
        >
          <FormField
            control={otpform.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage>
                  {(errors && errors[0]?.longMessage) || ""}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={creating}>
            {creating ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OtpForm;
