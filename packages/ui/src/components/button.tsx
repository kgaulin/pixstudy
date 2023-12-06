import { VariantProps, cva } from "class-variance-authority";

import React from "react";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center font-sans justify-center text-button-sm disabled:opacity-50 border outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary shadow-sm enabled:hover:shadow-md enabled:active:shadow-lg",
        flat: "bg-transparent shadow-none enabled:hover:shadow-sm enabled:active:shadow-md",
        none: "bg-transparent shadow-none enabled:hover:shadow-none enabled:active:shadow-none border-none",
      },
      shape: {
        default: "px-8 py-4",
        square: "px-4 py-4",
        none: "px-0 py-0",
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
