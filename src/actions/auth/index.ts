"use server";

import { db } from "@/lib/db";
import { SignUpParams } from "./types";

export const onSignUpUser = async (params: SignUpParams) => {
  const { clerkId, email, firstname, lastname } = params;
  try {
    const user = await db.user.create({
      data: {
        email,
        clerkId,
        firstname,
        lastname,
      },
    });
    if (user) {
      return {
        status: 201,
        data: user,
        message: "User successfully created",
      };
    }
    return {
      status: 400,
      message: "User could not be created! Try again",
      id: null,
    };
  } catch (error) {
    return {
      status: 400,
      message: "User could not be created! Try again",
      id: null,
    };
  }
};
