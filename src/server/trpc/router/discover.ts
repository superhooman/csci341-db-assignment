import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const discoverRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const discovers = await ctx.prisma.discover.findMany();
      return discovers;
    }),
  update: publicProcedure
    .input(z.object({
      cname: z.string(),
      disease_code: z.string(),
      first_enc_date: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const discover = await ctx.prisma.discover.upsert({
        where: {
          cname_disease_code: {
            cname: input.cname,
            disease_code: input.disease_code,
          }
        },
        update: input,
        create: input,
      });
      return discover;
    }),
  delete: publicProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      await Promise.all(input.map(async (cname_disease_code) => {
        await ctx.prisma.discover.delete({
          where: {
            cname_disease_code: {
              cname: cname_disease_code.split("!")[0]!,
              disease_code: cname_disease_code.split("!")[1]!,
            }
          }
        });
      }))
    }),
});
