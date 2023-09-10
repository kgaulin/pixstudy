import type { RefObject } from "react";
import { useRef } from "react";

export const useFocus = (): [RefObject<HTMLInputElement>, () => void] => {
  const htmlElRef = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    if (htmlElRef?.current) htmlElRef?.current?.focus();
  };

  return [htmlElRef, setFocus];
};
