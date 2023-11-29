import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const listVariants = cva(
  "ui-font-sans ui-justify-center ui-text-button-md  ui-border ui-border-dark  ",
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

export interface ListViewProps<T extends {}>
  extends VariantProps<typeof listVariants> {
  readonly className?: string;
  readonly items: T[];
  readonly key: keyof T;
  readonly renderItem: (item: T) => React.ReactNode;
}

export function ListView<T extends {}>({
  className,
  variant,
  items,
  renderItem,
  key,
}: ListViewProps<T>): JSX.Element {
  return (
    <ul className={cn(listVariants({ variant, className }))}>
      {items.map((item) => (
        <li
          className="ui-border-b ui-border-dark ui-p-4 last:ui-border-b-0"
          key={item[key] as string}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
