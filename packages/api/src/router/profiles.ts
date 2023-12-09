import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

import { and, eq, schema } from "@pixstudy/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profilesRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.profile.findMany({
      where: eq(schema.profile.userId, ctx.auth.userId),
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.profile.findFirst({
        where: and(
          eq(schema.profile.id, input.id),
          eq(schema.profile.userId, ctx.auth.userId),
        ),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        color: z.string().min(1),
        name: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insert(schema.profile)
        .values({ ...input, userId: ctx.auth.userId, id: createId() });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.profile)
      .where(
        and(
          eq(schema.profile.id, input),
          eq(schema.profile.userId, ctx.auth.userId),
        ),
      );
  }),
});
