import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const diseaseRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const diseases = await ctx.prisma.disease.findMany();
      return diseases;
    }),
  add: publicProcedure
    .input(z.object({
      disease_code: z.string(),
      pathogen: z.string(),
      description: z.string(),
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const disease = await ctx.prisma.disease.create({
        data: input,
      });
      return disease;
    }),
  update: publicProcedure
    .input(z.object({
      disease_code: z.string(),
      pathogen: z.string(),
      description: z.string(),
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const disease = await ctx.prisma.disease.upsert({
        where: { disease_code: input.disease_code },
        update: input,
        create: input,
      });
      return disease;
    }),
  delete: publicProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      const disease = await ctx.prisma.disease.deleteMany({
        where: { disease_code: { in: input } },
      });
      return disease;
    }),
});
