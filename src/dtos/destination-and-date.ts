import { z } from "zod";

export const destinationAndDateSchema = z.object({
  destination: z.string().min(1, "O campo de destino é obrigatório"),
  eventStartAndEndDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type DestinationAndDateType = z.infer<typeof destinationAndDateSchema>;
