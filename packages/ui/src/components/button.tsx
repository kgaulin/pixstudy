import { VariantProps, cva } from "class-variance-authority";

import React from "react";
import { cn } from "../utils";

const buttonVariants = cva(
  "ui-inline-flex ui-items-center ui-font-sans ui-justify-center ui-text-button-sm disabled:ui-opacity-50 ui-border",
  {
    variants: {
      variant: {
        default:
          "ui-bg-primary ui-shadow-sm enabled:hover:ui-shadow-md enabled:active:ui-shadow-lg",
        flat: "ui-bg-transparent ui-shadow-none enabled:hover:ui-shadow-sm enabled:active:ui-shadow-md",
      },
      shape: {
        default: "ui-px-8 ui-py-4",
        square: "ui-px-4 ui-py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, shape, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, shape, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
