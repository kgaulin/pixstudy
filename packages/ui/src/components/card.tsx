import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const cardVariants = cva(
  "ui-inline-flex ui-font-sans ui-justify-center ui-text-button-md  ui-border ",
  {
    variants: {
      variant: {
        default: "ui-shadow-sm hover:ui-shadow-md",
        flat: " ui-shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function Card({ className, variant, children }: CardProps): JSX.Element {
  return (
    <div className={cn(cardVariants({ variant, className }))}> {children}</div>
  );
}
