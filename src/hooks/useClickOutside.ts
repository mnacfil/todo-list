"use client";

import { useEffect } from "react";

type Params = {
  ref: React.MutableRefObject<null | HTMLDivElement>;
  callback?: () => void;
};

export const useClickOutside = ({ ref, callback }: Params) => {
  useEffect(() => {
    const onClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback && callback();
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
};
