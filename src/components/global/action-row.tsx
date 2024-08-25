import { Edit, List, LucideProps, MoveUp } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  endInfo?: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  TitleIcon?: Props["Icon"];
  EndInfoIcon?: Props["Icon"];
  color?: string;
  onClick?: () => void;
};

const ActionRow = ({
  Icon,
  title,
  endInfo,
  EndInfoIcon,
  TitleIcon,
  color,
  onClick,
}: Props) => {
  return (
    <div
      className="flex gap-2 items-center justify-between p-1 rounded-md hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-2 items-center">
        <Icon size={14} className={`${color ? color : "text-gray-400"}`} />
        <h6 className={`text-sm font-light ${color}`}>{title}</h6>
        {TitleIcon && <TitleIcon size={12} className="text-gray-400" />}
      </div>
      <div className="flex items-center justify-between">
        {EndInfoIcon && <EndInfoIcon size={12} className="text-gray-400" />}
        <p className={`text-[11px] text-gray-700 font-light`}>{endInfo}</p>
      </div>
    </div>
  );
};

export default ActionRow;
