import { createUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SSOCallbackSignUp = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-up");
  const res = await createUser({
    clerkId: user.id,
    email: user.emailAddresses[0].emailAddress,
    firstname: user.firstName ?? "",
    lastname: user.lastName ?? "",
  });
  if (res.status === 201) {
    redirect("/app");
  } else {
    redirect("/sign-up");
  }
};

export default SSOCallbackSignUp;
