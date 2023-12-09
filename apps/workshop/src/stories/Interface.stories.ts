import type { Meta, StoryObj } from "@storybook/react";

import { Interface } from "@pixstudy/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Interface",
  component: Interface,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
    weight: {
      options: ["normal", "bold", "medium"],
      control: { type: "select" },
    },
    color: {
      options: [
        "primary",
        "primary-light",
        "primary-dark",
        "dark",
        "light",
        "gray",
        "gray-light",
        "gray-dark",
        "negative",
        "positive",
        "warning",
      ],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Interface>;

export default meta;
type Story = StoryObj<typeof meta>;

Interface.displayName = "Interface";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Small: Story = {
  args: {
    size: "sm",
    children: "PixStudy.com",
    weight: "medium",
    color: "dark",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "PixStudy.com",
    weight: "medium",
    color: "dark",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "PixStudy.com",
    weight: "medium",
    color: "dark",
  },
};
