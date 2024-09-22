import { z } from "zod";

export const destinationAndDateSchema = z.object({
  destination: z.string().min(1, "O campo de destino é obrigatório"),
  eventStartAndEndDates: z.object(
    {
      from: z.date({
        required_error: "Selecione o período da viagem",
        invalid_type_error: "Selecione o período da viagem",
      }),
      to: z.date(),
    },
    {
      required_error: "Selecione o período da viagem",
      invalid_type_error: "Selecione o período da viagem",
    },
  ),
});

export type DestinationAndDateType = z.infer<typeof destinationAndDateSchema>;
