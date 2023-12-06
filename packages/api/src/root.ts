import { profilesRouter } from "./router/profiles";
import { wordSpellingListRouter } from "./router/wordSpellingList";
import { wordSpellingWordRouter } from "./router/wordSpellingWord";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  profiles: profilesRouter,
  wordSpellingList: wordSpellingListRouter,
  wordSpellingWord: wordSpellingWordRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
