import { VariantProps, cva } from "class-variance-authority";

import React, { ReactNode } from "react";
import { cn } from "../utils";
import { Button } from "./button";

const inputVariants = cva(
  "ui-inline-flex ui-bg-transparent ui-p-2 ui-font-sans ui-justify-center ui-text-button-md disabled:ui-opacity-50 ui-border ",
  {
    variants: {
      variant: {
        default:
          "ui-shadow-sm enabled:hover:ui-shadow-md enabled:active:ui-shadow-lg",
        flat: " ui-shadow-none enabled:hover:ui-shadow-sm enabled:active:ui-shadow-md",
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
            className=" ui-h-1 ui-w-1 ui-px-3 ui-py-3"
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
          className="ui-grow ui-bg-transparent ui-px-1 focus:ui-outline-none focus:ui-ring-0 focus-visible:ui-ring-0"
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
