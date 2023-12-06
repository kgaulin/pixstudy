import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const cardVariants = cva(
  "inline-flex font-sans justify-center text-button-md  border ",
  {
    variants: {
      variant: {
        default: "shadow-sm hover:shadow-md",
        flat: " shadow-none",
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
  readonly style?: React.CSSProperties;
}

export function Card({
  className,
  variant,
  children,
  style,
}: CardProps): JSX.Element {
  return (
    <div className={cn(cardVariants({ variant, className }))} style={style}>
      {" "}
      {children}
    </div>
  );
}
