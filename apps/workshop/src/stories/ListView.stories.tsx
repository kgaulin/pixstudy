import type { Meta, StoryObj } from "@storybook/react";

import { ListView } from "@pixstudy/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/ListView",
  component: ListView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    className: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof ListView>;

export default meta;
type Story = StoryObj<typeof meta>;

ListView.displayName = "ListView";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "flat",
    className: "text-primary w-96 ",
    items: [
      { id: "1", title: "Item 1" },
      { id: "2", title: "Item 2" },
    ],
    renderItem: (item: { id: string; title: string }) => (
      <div>{item.title}</div>
    ),
  },
};
