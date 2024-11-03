"use client";

import { useEffect } from "react";

type Params = {
  ref: React.MutableRefObject<null | HTMLFormElement>;
  callback?: () => void;
};

export const useClickOutside = ({ ref, callback }: Params) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // console.log((e.target as Node).textContent);

      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        (e.target as Node).textContent !== "Save"
      ) {
        callback && callback();
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [ref]);

  return null;
};
