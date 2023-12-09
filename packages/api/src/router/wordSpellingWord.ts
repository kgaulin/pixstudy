import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

import { and, desc, eq, schema } from "@pixstudy/db";
import { wordSpellingWord } from "@pixstudy/db/schema/wordSpelling";

import { createTRPCRouter, protectedAndProfileProcedure } from "../trpc";

export const wordSpellingWordRouter = createTRPCRouter({
  all: protectedAndProfileProcedure
    .input(z.object({ wordSpellingListId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.wordSpellingWord.findMany({
        where: and(
          eq(schema.wordSpellingWord.profileId, ctx.profileId),
          eq(
            schema.wordSpellingWord.wordSpellingListId,
            input.wordSpellingListId,
          ),
        ),
        orderBy: desc(wordSpellingWord.createdAt),
      });
    }),

  byId: protectedAndProfileProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.wordSpellingWord.findFirst({
        where: and(
          eq(schema.wordSpellingWord.id, input.id),
          eq(schema.wordSpellingWord.profileId, ctx.profileId),
        ),
      });
    }),

  create: protectedAndProfileProcedure
    .input(
      z.object({
        name: z.string().min(1),
        wordSpellingListId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insert(schema.wordSpellingWord)
        .values({ ...input, profileId: ctx.profileId, id: createId() });
    }),

  delete: protectedAndProfileProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(schema.wordSpellingWord)
        .where(
          and(
            eq(schema.wordSpellingWord.id, input),
            eq(schema.wordSpellingWord.profileId, ctx.profileId),
          ),
        );
    }),
});
