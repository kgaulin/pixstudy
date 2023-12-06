"use client";

import { cn } from "../utils";
import { Icon } from "./icon";

export interface ColorPickerProps {
  readonly className?: string;
  readonly currentColor: string;
  readonly colors: string[];
  readonly onCurrentColorChange: (color: string) => void;
}

export function ColorPicker({
  className,
  currentColor,
  colors,
  onCurrentColorChange,
}: ColorPickerProps): JSX.Element {
  return (
    <div
      className={cn("grid grid-cols-5 justify-items-center gap-4", className)}
    >
      {colors.map((c) => (
        <label htmlFor={c} key={c}>
          <input
            className="sr-only"
            key={c}
            id={c}
            name="color-picker"
            type="radio"
            value={c}
            onClick={() => onCurrentColorChange(c)}
          ></input>
          <div
            style={{ backgroundColor: c }}
            className="focus-visible:ring-ring focus-visible:ring-none focus-visible:ring-offset-none aspect-square h-6 w-6 cursor-pointer rounded-full border border-dark   focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
          >
            {c === currentColor && (
              <Icon icon="Check" className="h-6 w-6 p-1"></Icon>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
