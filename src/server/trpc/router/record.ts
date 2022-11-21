import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const recordRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const records = await ctx.prisma.record.findMany();
      return records;
    }),
  update: publicProcedure
    .input(z.object({
      email: z.string().email(),
      cname: z.string(),
      disease_code: z.string(),
      total_deaths: z.number(),
      total_patients: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.prisma.record.upsert({
        where: {
          email_cname_disease_code: {
            email: input.email,
            cname: input.cname,
            disease_code: input.disease_code,
          }
        },
        update: input,
        create: input,
      });
      return record;
    }),
  delete: publicProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      await Promise.all(input.map(async (email_cname_disease_code) => {
        await ctx.prisma.record.delete({
          where: {
            email_cname_disease_code: {
              email: email_cname_disease_code.split("!")[0]!,
              cname: email_cname_disease_code.split("!")[1]!,
              disease_code: email_cname_disease_code.split("!")[2]!,
            }
          }
        });
      }))
    }),
});
