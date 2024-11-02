import React, { ReactNode } from "react";

type Props = {
  title: string;
  isLabel?: boolean;
  endInfo?: string;
  Icon?: any;
  TitleIcon?: Props["Icon"];
  EndInfoIcon?: Props["Icon"];
  color?: string;
  children?: ReactNode;
  onClick?: () => void;
};

const ActionRow = ({
  Icon,
  title,
  endInfo,
  EndInfoIcon,
  TitleIcon,
  color,
  isLabel,
  children,
  onClick,
}: Props) => {
  return (
    <>
      <div
        className="flex gap-2 items-center justify-between p-1 rounded-md hover:bg-gray-100 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex gap-2 items-center">
          {Icon && (
            <Icon size={14} className={`${color ? color : "text-gray-400"}`} />
          )}
          <h6
            className={`text-sm ${color} ${
              isLabel ? "font-[500]" : "font-light"
            }`}
          >
            {title}
          </h6>
          {TitleIcon && <TitleIcon size={12} className="text-gray-400" />}
        </div>
        <div className="flex items-center justify-between">
          {EndInfoIcon && <EndInfoIcon size={12} className="text-gray-400" />}
          {endInfo && (
            <p className={`text-[11px] text-gray-700 font-light`}>{endInfo}</p>
          )}
        </div>
      </div>
      <div className="p-1">{children}</div>
    </>
  );
};

export default ActionRow;
