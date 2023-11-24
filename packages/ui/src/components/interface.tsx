import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const interfaceVariants = cva("ui-text-dark", {
  variants: {
    size: {
      lg: "ui-text-label-lg",
      md: "ui-text-label-md",
      sm: "ui-text-label-sm",
    },
    weight: {
      bold: "ui-font-bold",
      medium: "ui-font-medium",
      normal: "ui-font-normal",
    },
    color: {
      dark: "ui-text-dark",
      "dark-light": "ui-text-dark-light",
      light: "ui-text-light",
      primary: "ui-text-primary",
      "primary-dark": "ui-text-primary-dark",
      "primary-light": "ui-text-primary-light",
      gray: "ui-text-gray",
      "gray-light": "ui-text-gray-light",
      negative: "ui-text-negative",
      positive: "ui-text-positive",
      warning: "ui-text-warning",
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
