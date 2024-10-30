import LoginForm from "@/components/form/login";
import GoogleAuthButton from "@/components/global/google-auth-button";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Log in</h1>
      <div className="flex justify-between gap-10 w-full h-full">
        <div className="flex-1">
          <GoogleAuthButton method="login" />
          <Separator className="my-4" />
          <LoginForm />
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
            href="/sign-up"
            className="text-sm text-center w-full flex justify-center"
          >
            Don&apos; have account?{" "}
            <span className="underline pl-1">Sign up</span>
          </Link>
        </div>
        <div className="flex-1">
          <Image
            src={"/images/login-pic.png"}
            width={300}
            height={300}
            alt="login"
            className="object-contain w-full"
          />
          <p className="text-muted-foreground text-center">
            Start organizing your day.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
