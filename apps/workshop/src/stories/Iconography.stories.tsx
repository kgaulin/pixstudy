import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Icon, icons } from "@pixstudy/ui";

function Iconography() {
  const [items, setItems] = useState<string[]>(Object.keys(icons));
  const [showToast, setShowToast] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = Object.keys(icons).filter((key) =>
      key.toLowerCase().includes(value.toLowerCase()),
    );

    setItems(filtered);
  };

  const onClick = (name: string) => {
    navigator.clipboard.writeText(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div>
      <div
        className={`${
          showToast ? "opacity-100" : "opacity-0"
        } bg-green-500 text-white text-sm fixed bottom-4 end-4 rounded-lg bg-light px-4 py-2 transition-all duration-500 ease-in-out`}
      >
        Copied to clipboard!
      </div>

      <label
        htmlFor="default-search"
        className="text-sm text-gray-900 dark:text-white sr-only mb-2 font-medium"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="text-gray-500 dark:text-gray-400 h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="text-sm text-gray-900 border-gray-300 bg-gray-50 block w-full rounded-lg  border p-4 ps-10 focus:outline-none focus:ring-0 focus-visible:ring-0"
          placeholder="Search icons..."
          required
          onChange={onChange}
        />
      </div>

      <div
        className="w-full"
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          paddingTop: "32px",
          height: "100%",
        }}
      >
        {items.map((name) => (
          <button
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              cursor: "pointer",
            }}
            onClick={() => onClick(name)}
          >
            <Icon className="height-8 width-8" icon={name} />
            <span className="text-sm">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Icon/Iconography2",
  component: Iconography,
  parameters: {
    sidebar: { disable: true },

    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["isHidden"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Iconography>;

export default meta;
type Story = StoryObj<typeof meta>;

Icon.displayName = "Iconography";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
