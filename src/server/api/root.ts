import { createTRPCRouter } from "~/server/api/trpc";
import { wordlyGameSettingsRouter } from "./routers/wordlyGameSettings";
import { wordlyWordListRouter } from "./routers/wordlyWordList";
import { wordlyWordsRouter } from "./routers/wordlyWords";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  wordlyWordList: wordlyWordListRouter,
  wordlyWords: wordlyWordsRouter,
  wordlyGameSettings: wordlyGameSettingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
