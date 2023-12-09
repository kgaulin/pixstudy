import type { Meta, StoryObj } from "@storybook/react";

import { Icon, icons } from "@pixstudy/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    icon: {
      options: Object.keys(icons),
      control: { type: "select" },
    },
    className: {
      control: { type: "text" },
    },
    rotate: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

Icon.displayName = "Icon";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    icon: "ArrowLeft",
    rotate: 0,
    className: "text-primary height-8 width-8",
  },
};
