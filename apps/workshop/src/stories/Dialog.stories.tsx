import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, Dialog } from "@pixstudy/ui";

const DialogWrapper = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={props.title}
      content={props.content}
      target={document.body}
      trigger={
        <Button shape="default" variant="default" onClick={() => setOpen(true)}>
          Open
        </Button>
      }
    ></Dialog>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Dialog",
  component: DialogWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    actions: { argTypesRegex: "^on*" },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    open: {
      control: {
        type: "boolean",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    trigger: {
      control: {
        type: "text",
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

Dialog.displayName = "Dialog";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    open: false,
    title: "Dialog Title",
    content: <div> Dialog Content</div>,
  },
};
