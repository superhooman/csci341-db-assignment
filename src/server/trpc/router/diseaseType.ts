import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const diseaseTypeRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const diseaseTypes = await ctx.prisma.diseaseType.findMany();
      return diseaseTypes;
    }),
  add: publicProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const diseaseType = await ctx.prisma.diseaseType.create({
        data: input,
      });
      return diseaseType;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id === -1) {
        const diseaseType = await ctx.prisma.diseaseType.create({
          data: {
            description: input.description,
          },
        });
        return diseaseType;
      }
      const diseaseType = await ctx.prisma.diseaseType.update({
        where: { id: input.id },
        data: input,
      });
      return diseaseType;
    }),
  delete: publicProcedure
    .input(z.number().array())
    .mutation(async ({ ctx, input }) => {
      const diseaseType = await ctx.prisma.diseaseType.deleteMany({
        where: { id: { in: input } },
      });
      return diseaseType;
    }),
});
