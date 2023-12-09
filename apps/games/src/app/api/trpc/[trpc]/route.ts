import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@pixstudy/api";

export const runtime = "edge";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const handler = async (request: NextRequest): Promise<Response> => {
  const coookiesStore = cookies();
  const profileCookie = coookiesStore.get("profile");

  const response = await fetchRequestHandler({
    req: request,
    //   env is passed to the createContext function
    createContext: () =>
      createTRPCContext({ req: request, profileId: profileCookie?.value }),
    endpoint: "/api/trpc",
    router: appRouter,
    onError({ error, path }) {
      console.error(`tRPC Error on '${path}'`, error);
    },
  });

  setCorsHeaders(response);

  return response;
};

export { handler as GET, handler as POST };
