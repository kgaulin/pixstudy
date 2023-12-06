import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const interfaceVariants = cva("text-dark", {
  variants: {
    size: {
      lg: "text-label-lg",
      md: "text-label-md",
      sm: "text-label-sm",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
      normal: "font-normal",
    },
    color: {
      dark: "text-dark",
      "dark-light": "text-dark-light",
      light: "text-light",
      primary: "text-primary",
      "primary-dark": "text-primary-dark",
      "primary-light": "text-primary-light",
      gray: "text-gray",
      "gray-light": "text-gray-light",
      negative: "text-negative",
      positive: "text-positive",
      warning: "text-warning",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "medium",
  },
});

export interface InterfaceProps extends VariantProps<typeof interfaceVariants> {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function Interface({
  className,
  size,
  weight,
  color,
  children,
}: InterfaceProps): JSX.Element {
  return (
    <p className={cn(interfaceVariants({ size, weight, color, className }))}>
      {children}
    </p>
  );
}
