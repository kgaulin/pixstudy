import * as PopoverRU from "@radix-ui/react-popover";
import { cn } from "../utils";

export interface PopoverProps {
  readonly trigger: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export const Popover = ({ trigger, className, children }: PopoverProps) => (
  <PopoverRU.Root>
    <PopoverRU.Trigger asChild>{trigger}</PopoverRU.Trigger>
    <PopoverRU.Portal>
      <PopoverRU.Content
        className={cn(
          "min-w-[260px] border border-dark bg-ground p-5 shadow-sm will-change-[transform,opacity]  focus:outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade",
          className,
        )}
        collisionPadding={25}
        sideOffset={5}
      >
        {children}
      </PopoverRU.Content>
    </PopoverRU.Portal>
  </PopoverRU.Root>
);
