import { createId } from "@paralleldrive/cuid2";
import { and, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { wordlyWord, wordlyWordList } from "~/db/schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const wordlyWordListRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.insert(wordlyWordList).values({
        id: createId(),
        name: input.name,
        userId: ctx.auth.userId,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .delete(wordlyWordList)
        .where(
          and(
            eq(wordlyWordList.id, input.id),
            eq(wordlyWordList.userId, ctx.auth.userId)
          )
        );
    }),
  editName: protectedProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(wordlyWordList)
        .set({ name: input.name })
        .where(
          and(
            eq(wordlyWordList.id, input.id),
            eq(wordlyWordList.userId, ctx.auth.userId)
          )
        );
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const rows = await ctx.db
        .select({
          id: wordlyWordList.id,
          name: wordlyWordList.name,
          wordsCount: sql<number>`count(${wordlyWord.id})`,
        })
        .from(wordlyWordList)
        .leftJoin(wordlyWord, eq(wordlyWord.wordListId, wordlyWordList.id))
        .groupBy(wordlyWordList.id)
        .where(
          and(
            eq(wordlyWordList.id, input.id),
            eq(wordlyWordList.userId, ctx.auth.userId)
          )
        )
        .limit(1);

      const row = rows[0];
      return row ?? null;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: wordlyWordList.id,
        name: wordlyWordList.name,
        wordsCount: sql<number>`count(${wordlyWord.id})`,
      })
      .from(wordlyWordList)
      .leftJoin(wordlyWord, eq(wordlyWord.wordListId, wordlyWordList.id))
      .groupBy(wordlyWordList.id)
      .orderBy(desc(wordlyWordList.createdAt))
      .where(and(eq(wordlyWordList.userId, ctx.auth.userId)));
  }),
});
