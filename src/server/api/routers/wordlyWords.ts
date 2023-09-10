import { createId } from "@paralleldrive/cuid2";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import { wordlyWord } from "~/db/schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const wordlyWordsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), wordListId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.insert(wordlyWord).values({
        id: createId(),
        name: input.name,
        userId: ctx.auth.userId,
        wordListId: input.wordListId,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db
        .delete(wordlyWord)
        .where(
          and(
            eq(wordlyWord.id, input.id),
            eq(wordlyWord.userId, ctx.auth.userId)
          )
        );
    }),
  editName: protectedProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(wordlyWord)
        .set({ name: input.name })
        .where(
          and(
            eq(wordlyWord.id, input.id),
            eq(wordlyWord.userId, ctx.auth.userId)
          )
        );
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const rows = await ctx.db
        .select()
        .from(wordlyWord)
        .where(
          and(
            eq(wordlyWord.id, input.id),
            eq(wordlyWord.userId, ctx.auth.userId)
          )
        )
        .limit(1);

      const row = rows[0];
      return row ?? null;
    }),
  getAll: protectedProcedure.input(z.object({ id: z.string() })).query(
    async ({ input, ctx }) =>
      await ctx.db
        .select()
        .from(wordlyWord)
        .where(
          and(
            eq(wordlyWord.wordListId, input.id),
            eq(wordlyWord.userId, ctx.auth.userId)
          )
        )
        .orderBy(asc(wordlyWord.createdAt))
  ),
});
