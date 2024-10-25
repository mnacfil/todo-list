import React from "react";
import Overview from "../_components/overview-section";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full flex flex-col h-full">
      <Overview />
    </div>
  );
};

export default page;
