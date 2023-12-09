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

export interface ListViewProps<T extends {}, G extends {}>
  extends VariantProps<typeof listVariants> {
  readonly className?: string;
  readonly items: T[];
  readonly pendingItem?: G;
  readonly isPending?: boolean;
  readonly key: keyof T;
  readonly renderItem: (item: T) => React.ReactNode;
  readonly renderPendingItem?: (item: G) => React.ReactNode;
}

export function ListView<T extends {}, G extends {}>({
  className,
  variant,
  items,
  pendingItem,
  renderItem,
  renderPendingItem,
  isPending,
  key,
}: ListViewProps<T, G>): JSX.Element {
  return (
    <ul className={cn(listVariants({ variant, className }))}>
      {isPending && !!pendingItem && !!renderPendingItem && (
        <li className="border-b border-dark last:border-b-0">
          {renderPendingItem(pendingItem)}
        </li>
      )}

      {items.map((item) => (
        <li
          className="border-b border-dark  last:border-b-0"
          key={item[key] as string}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
