import { ChangeEvent } from "react";

export const onEnterKey = (
  e: React.KeyboardEvent<HTMLInputElement>,
  callback: () => void
) => {
  if (e.key === "Enter") {
    callback();
  }
};

export const onChange = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (value: string) => void
) => {
  callback(e.target.value);
};
