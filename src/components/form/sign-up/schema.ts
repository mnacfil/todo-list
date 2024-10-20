import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "first name must be atleast 3 characters long" }),
  lastName: z
    .string()
    .min(3, { message: "first name must be atleast 3 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer than 64 characters long.",
    })
    .refine((value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? "")),
});
