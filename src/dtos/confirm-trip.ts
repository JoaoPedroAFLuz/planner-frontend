import { z } from "zod";

export const confirmTripSchema = z.object({
  ownerName: z.string().min(1, "O campo de nome é obrigatório"),
  ownerEmail: z.string().email("Insira um e-mail válido"),
});

export type ConfirmTripType = z.infer<typeof confirmTripSchema>;
