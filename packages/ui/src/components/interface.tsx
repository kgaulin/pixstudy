import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const interfaceVariants = cva("ui-text-dark ui-font-medium", {
  variants: {
    size: {
      lg: "ui-text-label-lg",
      md: "ui-text-label-md",
      sm: "ui-text-label-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface InterfaceProps extends VariantProps<typeof interfaceVariants> {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function Interface({
  className,
  size,
  children,
}: InterfaceProps): JSX.Element {
  return (
    <p className={cn(interfaceVariants({ size, className }))}>{children}</p>
  );
}
