import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@pixstudy/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    as: {
      options: ["h1", "h2", "h3", "h4", "h5"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

Heading.displayName = "Heading";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const H1: Story = {
  args: {
    as: "h1",
    children: "PixStudy.com",
  },
};

export const H2: Story = {
  args: {
    as: "h2",
    children: "PixStudy.com",
  },
};

export const H3: Story = {
  args: {
    as: "h3",
    children: "PixStudy.com",
  },
};

export const H4: Story = {
  args: {
    as: "h4",
    children: "PixStudy.com",
  },
};

export const H5: Story = {
  args: {
    as: "h5",
    children: "PixStudy.com",
  },
};
