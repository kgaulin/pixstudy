"use client";

import * as React from "react";
import ReactDOM from "react-dom";
import { Button } from "./button";
import { Icon } from "./icon";

export interface DialogProps {
  readonly open: boolean;
  readonly title: string;
  readonly content: React.ReactNode;
  readonly trigger: React.ReactNode;
  readonly target: Element | DocumentFragment;
  readonly onOpenChange: (open: boolean) => void;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  content,
  trigger,
  target,
}: DialogProps): JSX.Element {
  const modal = ReactDOM.createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <button
        className="fixed bottom-0 left-0 right-0 top-0 -z-40 bg-overlay outline-none backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      ></button>
      <div className="fixed left-1/2 top-1/2  flex min-h-[100dvh] min-w-[100vw] -translate-x-1/2 -translate-y-1/2 transform flex-col  rounded-sm bg-light md:min-h-[85dvh]  md:min-w-[450px]">
        <div className="flex items-center justify-between border-b border-b-dark px-4 py-1 text-heading-md font-bold">
          {title}
          <Button
            shape="none"
            variant="none"
            className="h-4 w-4"
            onClick={() => onOpenChange(false)}
          >
            <Icon className="h-2 w-2" icon="Close"></Icon>
          </Button>
        </div>
        <div className="flex h-full w-full grow flex-col">{content}</div>
      </div>
    </div>,
    target,
  );

  return (
    <>
      {trigger}
      {open && modal}
    </>
  );
}
