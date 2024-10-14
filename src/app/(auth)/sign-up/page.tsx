import React from "react";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <>
      <h1 className="text-3xl font-semibold">Sign Up</h1>
      <div className="flex justify-between gap-10 w-full h-full">
        <div className="bg-red-100 flex-1">Form</div>
        <div className="bg-red-200 flex-1">Picture</div>
      </div>
    </>
  );
};

export default SignUp;
