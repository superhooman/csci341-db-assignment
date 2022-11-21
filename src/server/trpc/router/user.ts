import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const users = await ctx.prisma.users.findMany();
      return users;
    }),
  update: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string(),
      surname: z.string(),
      salary: z.number(),
      phone: z.string(),
      cname: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.users.upsert({
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
      const users = await ctx.prisma.users.deleteMany({
        where: { email: { in: input } },
      });
      return users;
    }),
});
