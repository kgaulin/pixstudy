// tailwind config is required for editor support

import type { Config } from "tailwindcss";

import baseConfig from "@pixstudy/tailwind-config";

const config: Pick<Config, "presets"> = {
  presets: [baseConfig],
};

export default config;
