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
          "p-5 w-[260px] bg-ground shadow-sm border border-dark focus:outline-none  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade",
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
