import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const listVariants = cva(
  "font-sans justify-center text-button-md  border border-dark  ",
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
          className="border-b border-dark p-4 last:border-b-0"
          key={item[key] as string}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
