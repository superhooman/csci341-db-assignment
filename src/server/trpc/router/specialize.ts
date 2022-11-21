import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const specializeRouter = router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const specializes = await ctx.prisma.specialize.findMany();
      return specializes;
    }),
  update: publicProcedure
    .input(z.object({
      email: z.string().email(),
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.specialize.upsert({
        where: {
          id_email: {
            id: input.id,
            email: input.email,
          }
        },
        update: input,
        create: input,
      });
      return user;
    }),
  delete: publicProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      await Promise.all(input.map(async (id_email) => {
        await ctx.prisma.specialize.delete({
          where: {
            id_email: {
              id: Number(id_email.split("!")[0]!),
              email: id_email.split("!")[1]!,
            }
          }
        });
      }))
    }),
});
