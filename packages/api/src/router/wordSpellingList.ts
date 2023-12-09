import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

import { and, desc, eq, schema } from "@pixstudy/db";
import { wordSpellingList } from "@pixstudy/db/schema/wordSpelling";

import { createTRPCRouter, protectedAndProfileProcedure } from "../trpc";

export const wordSpellingListRouter = createTRPCRouter({
  all: protectedAndProfileProcedure.query(({ ctx }) => {
    return ctx.db.query.wordSpellingList.findMany({
      where: eq(schema.wordSpellingList.profileId, ctx.profileId),
      orderBy: desc(schema.wordSpellingList.createdAt),
    });
  }),

  byId: protectedAndProfileProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.wordSpellingList.findFirst({
        where: and(
          eq(schema.wordSpellingList.id, input.id),
          eq(schema.wordSpellingList.profileId, ctx.profileId),
        ),
      });
    }),

  create: protectedAndProfileProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = createId();

      await ctx.db
        .insert(schema.wordSpellingList)
        .values({ ...input, profileId: ctx.profileId, id: id });

      return { id: id };
    }),
  update: protectedAndProfileProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(wordSpellingList)
        .set({ name: input.name })
        .where(
          and(
            eq(wordSpellingList.id, input.id),
            eq(wordSpellingList.profileId, ctx.profileId),
          ),
        );
    }),

  delete: protectedAndProfileProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(schema.wordSpellingList)
        .where(
          and(
            eq(schema.wordSpellingList.id, input),
            eq(schema.wordSpellingList.profileId, ctx.profileId),
          ),
        );
    }),
});
