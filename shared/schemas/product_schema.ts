import z from "zod";

export const productCreate = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.boolean().optional(),
});

export type productCreateType = z.infer<typeof productCreate>;
