import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@pixstudy/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@pixstudy/api";
