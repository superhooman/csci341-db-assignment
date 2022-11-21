import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const doctorRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const doctors = await ctx.prisma.doctor.findMany();
      return doctors;
    }),
  update: publicProcedure
    .input(z.object({
      email: z.string().email(),
      degree: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.doctor.upsert({
        where: {
          email: input.email,
        },
        update: input,
        create: input,
      });
      return user;
    }),
  delete: publicProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      const doctors = await ctx.prisma.doctor.deleteMany({
        where: { email: { in: input } },
      });
      return doctors;
    }),
});
