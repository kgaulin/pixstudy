// tailwind config is required for editor support
import baseConfig from "@pixstudy/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets"> = {
  presets: [baseConfig],
};

export default config;
