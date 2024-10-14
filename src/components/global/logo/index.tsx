import { ListTodo } from "lucide-react";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex gap-2 items-center py-5">
      <ListTodo />
      todoist
    </div>
  );
};

export default Logo;
