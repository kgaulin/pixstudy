import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const headingVariants = cva("ui-text-dark", {
  variants: {
    as: {
      h1: "ui-font-bold ui-text-heading-2xl",
      h2: "ui-font-bold ui-text-heading-xl",
      h3: "ui-font-bold ui-text-heading-lg",
      h4: "ui-font-bold ui-text-heading-md",
      h5: "ui-font-bold ui-text-heading-sm",
    },
  },
  defaultVariants: {
    as: "h1",
  },
});

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function Heading({
  className,
  as,
  children,
}: HeadingProps): JSX.Element {
  let tag;
  switch (as) {
    case "h1":
      tag = (
        <h1 className={cn(headingVariants({ as, className }))}>{children}</h1>
      );
      break;
    case "h2":
      tag = (
        <h2 className={cn(headingVariants({ as, className }))}>{children}</h2>
      );
      break;
    case "h3":
      tag = (
        <h3 className={cn(headingVariants({ as, className }))}>{children}</h3>
      );
      break;
    case "h4":
      tag = (
        <h4 className={cn(headingVariants({ as, className }))}>{children}</h4>
      );
      break;
    case "h5":
      tag = (
        <h5 className={cn(headingVariants({ as, className }))}>{children}</h5>
      );
      break;
  }

  return <>{tag}</>;
}