import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

import { and, eq, schema } from "@pixstudy/db";

import { createTRPCRouter, protectedAndProfileProcedure } from "../trpc";

export const wordSpellingListRouter = createTRPCRouter({
  all: protectedAndProfileProcedure.query(({ ctx }) => {
    return ctx.db.query.wordSpellingList.findMany({
      where: eq(schema.wordSpellingList.profileId, ctx.profileId),
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
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insert(schema.wordSpellingList)
        .values({ ...input, profileId: ctx.profileId, id: createId() });
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
