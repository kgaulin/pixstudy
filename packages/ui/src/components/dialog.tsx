"use client";

import * as RdDialog from "@radix-ui/react-dialog";
import * as React from "react";
import { Heading } from "..";
import { Icon } from "./icon";

export interface DialogProps {
  readonly open: boolean;
  readonly title: string;
  readonly children: React.ReactNode;
  readonly trigger: React.ReactNode;
  readonly onOpenChange: (open: boolean) => void;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  trigger,
}: DialogProps): JSX.Element {
  return (
    <RdDialog.Root open={open} onOpenChange={onOpenChange}>
      <RdDialog.Trigger asChild>{trigger}</RdDialog.Trigger>
      <RdDialog.Portal>
        <RdDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-overlay" />
        <RdDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-sm  bg-light p-[25px]  focus:outline-none">
          <RdDialog.Title className="m-0 flex items-center  justify-between border-b border-dark pb-4 font-medium text-dark">
            <>
              <Heading as="h3">{title}</Heading>
              <RdDialog.Close className="float-right" asChild>
                <Icon icon="Close" className="h-4 w-4 text-dark"></Icon>
              </RdDialog.Close>
            </>
          </RdDialog.Title>
          {children}
        </RdDialog.Content>
      </RdDialog.Portal>
    </RdDialog.Root>
  );
}
