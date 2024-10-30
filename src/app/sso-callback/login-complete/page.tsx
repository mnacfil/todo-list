import { authenticateUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SSOCallbackLogin = async () => {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    redirect("/login");
  }
  const res = await authenticateUser(user.id);
  if (res.status === 200) {
    redirect("/app");
  } else {
    redirect("/login");
  }
};

export default SSOCallbackLogin;
