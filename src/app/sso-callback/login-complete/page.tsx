import { authenticateUser, createUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SSOCallbackLogin = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }
  const res = await authenticateUser(user.id);
  if (res.status === 200) {
    redirect("/app");
  } else {
    const createdUser = await createUser({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstname: user?.firstName ?? "",
      lastname: user?.lastName ?? "",
    });
    if (createdUser.status === 201) {
      redirect("/app");
    } else {
      redirect("/login");
    }
  }
};

export default SSOCallbackLogin;
