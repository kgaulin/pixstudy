import { VariantProps, cva } from "class-variance-authority";

import React, { ReactNode } from "react";
import { cn } from "../utils";
import { Button } from "./button";

const inputVariants = cva(
  "inline-flex bg-transparent p-2 font-sans justify-center text-button-md disabled:opacity-50 border ",
  {
    variants: {
      variant: {
        default: "shadow-sm enabled:hover:shadow-md enabled:active:shadow-lg",
        flat: " shadow-none enabled:hover:shadow-sm enabled:active:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  onClick?: () => void;
  appendIcon?: ReactNode;
  prependIcon?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, appendIcon, onClick, prependIcon, ...props }, ref) => {
    let append;

    switch (true) {
      case Boolean(appendIcon) && !!onClick:
        append = (
          <Button
            className=" h-1 w-1 px-3 py-3"
            shape="square"
            variant="flat"
            onClick={onClick}
          >
            {appendIcon}
          </Button>
        );
        break;
      case Boolean(appendIcon):
        append = appendIcon;
        break;
      default:
        append = null;
        break;
    }

    return (
      <div className={cn(inputVariants({ variant, className }))}>
        {prependIcon}
        <input
          className="grow bg-transparent px-1 focus:outline-none focus:ring-0 focus-visible:ring-0"
          ref={ref}
          {...props}
        ></input>
        {append}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
