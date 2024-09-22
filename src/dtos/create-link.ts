import { z } from "zod";

export const createLinkSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  url: z.string().min(1, "A url é obrigatória"),
});

export type CreateLinkType = z.infer<typeof createLinkSchema>;
