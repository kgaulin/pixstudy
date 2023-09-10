import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { wordlyGameSetting } from "~/db/schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const settingSchema = z.object({
  currentWord: z.union([z.string(), z.null()]),
  gameWords: z.array(z.string()),
  correctlySpelledWords: z.array(z.string()),
  notCorrectlySpelledWords: z.array(z.string()),
});

export const wordlyGameSettingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        wordListId: z.string(),
        settings: settingSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = createId();

      await ctx.db.insert(wordlyGameSetting).values({
        id,
        userId: ctx.auth.userId,
        settings: input.settings,
        wordListId: input.wordListId,
      });

      return { id };
    }),
  update: protectedProcedure
    .input(
      z.object({
        settings: settingSchema,
        status: z.enum(["started", "finished"] as const),
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(wordlyGameSetting)
        .set({
          settings: input.settings,
          status: input.status,
        })
        .where(
          and(
            eq(wordlyGameSetting.id, input.id),
            eq(wordlyGameSetting.userId, ctx.auth.userId)
          )
        );
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const rows = await ctx.db
        .select()
        .from(wordlyGameSetting)
        .where(
          and(
            eq(wordlyGameSetting.id, input.id),
            eq(wordlyGameSetting.userId, ctx.auth.userId)
          )
        )
        .limit(1);

      const row = rows[0];
      return row ?? null;
    }),
});
