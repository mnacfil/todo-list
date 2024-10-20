"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthSignUp } from "@/hooks/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  authSignup: Pick<
    ReturnType<typeof useAuthSignUp>,
    "onSubmit" | "signupform" | "verifying" | "errors"
  >;
};

const SignUpForm = ({ authSignup }: Props) => {
  const { signupform, errors, verifying, onSubmit } = authSignup;

  return (
    <Form {...signupform}>
      <form onSubmit={signupform.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={signupform.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupform.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupform.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupform.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {(errors && errors[0]?.longMessage) || ""}
              </FormMessage>
            </FormItem>
          )}
        />
        {}
        <Button type="submit" className="w-full h-12" disabled={verifying}>
          {verifying ? "loading..." : "Sign up with email"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
