import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const countryRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const countries = await ctx.prisma.country.findMany();
      return countries;
    }),
  add: publicProcedure
    .input(z.object({ cname: z.string(), population: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const country = await ctx.prisma.country.create({
        data: input,
      });
      return country;
    }),
  update: publicProcedure
    .input(z.object({ cname: z.string(), population: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const country = await ctx.prisma.country.upsert({
        where: { cname: input.cname },
        update: input,
        create: input,
      });
      return country;
    }),
  delete: publicProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      const countries = await ctx.prisma.country.deleteMany({
        where: { cname: { in: input } },
      });
      return countries;
    }),
});
