import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const publicServantRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const ps = await ctx.prisma.publicServant.findMany();
      return ps;
    }),
  update: publicProcedure
    .input(z.object({
      email: z.string().email(),
      department: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.publicServant.upsert({
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
      const ps = await ctx.prisma.publicServant.deleteMany({
        where: { email: { in: input } },
      });
      return ps;
    }),
});
