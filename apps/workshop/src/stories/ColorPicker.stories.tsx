import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ColorPicker } from "@pixstudy/ui";

const ColorPickerWrapper = (props: any) => {
  const [currentColor, setCurrentColor] = React.useState(props.currentColor);

  return (
    <ColorPicker
      currentColor={currentColor}
      onCurrentColorChange={setCurrentColor}
      colors={props.colors}
    ></ColorPicker>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/ColorPicker",
  component: ColorPickerWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      options: ["default", "flat"],
      control: { type: "select" },
    },
    shape: {
      options: ["default", "square"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    currentColor: "#ff0000",
    colors: [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#000000",
      "#ffffff",
      "#ff8000",
      "#8000ff",
      "#00ff80",
      "#ff0080",
      "#80ff00",
      "#0080ff",
      "#800000",
      "#008000",
      "#000080",
      "#808000",
      "#800080",
      "#008080",
      "#808080",
      "#ff8080",
      "#80ff80",
      "#8080ff",
      "#ffff80",
      "#ff80ff",
      "#80ffff",
      "#c0c0c0",
      "#ff4000",
      "#4000ff",
      "#00ff40",
      "#ff0040",
      "#40ff00",
      "#0040ff",
      "#400000",
      "#004000",
      "#000040",
      "#404000",
      "#400040",
      "#004040",
      "#404040",
      "#ff0040",
      "#40ff40",
      "#4040ff",
      "#ffff40",
      "#ff40ff",
      "#40ffff",
      "#ffffff",
      "#ffbf00",
      "#bf00ff",
      "#00ffbf",
      "#ff00bf",
      "#bfff00",
      "#00bfff",
      "#bf0000",
      "#00bf00",
      "#0000bf",
      "#bfbf00",
      "#bf00bf",
      "#00bfbf",
      "#bfbfbf",
      "#ffbf40",
      "#40ffbf",
      "#bfbfff",
      "#ffffbf",
      "#ffbf80",
      "#80ffbf",
      "#bfbfff",
      "#ff80bf",
      "#bf80ff",
      "#80bfff",
      "#bfbfff",
      "#bfbfff",
      "#ff80ff",
      "#80ffff",
      "#bfbfff",
      "#c0c0c0",
      "#ffbf80",
      "#80ff80",
      "#80bfff",
      "#ff80bf",
      "#bfff80",
      "#80bfff",
      "#808080",
      "#ff8040",
      "#40ff80",
      "#80ff40",
      "#ff4080",
      "#40ff80",
      "#4080ff",
    ],
  },
};
