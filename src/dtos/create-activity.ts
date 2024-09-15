import { z } from "zod";

export const createActivitySchema = z.object({
  title: z.string().min(1, "O campo de nome é obrigatório"),
  description: z.string().optional(),
  occursAt: z.string().min(1, "O campo de data é obrigatório"),
});

export type CreateActivityType = z.infer<typeof createActivitySchema>;
