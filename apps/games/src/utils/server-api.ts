import { cache } from "react";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs";
import { createTRPCClient, loggerLink, TRPCClientError } from "@trpc/client";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import type { TRPCErrorResponse } from "@trpc/server/rpc";
import SuperJSON from "superjson";

import { appRouter } from "@pixstudy/api";
import { createServerTRPCContext } from "@pixstudy/api/src/trpc";

export type * from "@pixstudy/api";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const coookiesStore = cookies();
  const profileCookie = coookiesStore.get("profile");

  return createServerTRPCContext({
    auth: auth(),
    profileId: profileCookie?.value,
  });
});

export const api = createTRPCClient<typeof appRouter>({
  transformer: SuperJSON,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    /**
     * Custom RSC link that invokes procedures directly in the server component Don't be too afraid
     * about the complexity here, it's just wrapping `callProcedure` with an observable to make it a
     * valid ending link for tRPC.
     */
    () =>
      ({ op }) =>
        observable((observer) => {
          const ctx = createContext();
          callProcedure({
            procedures: appRouter._def.procedures,
            path: op.path,
            getRawInput: () => Promise.resolve(op.input),
            ctx,
            type: op.type,
          })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
