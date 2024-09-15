import { z } from "zod";

export const inviteParticipantSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
});

export type InviteParticipantType = z.infer<typeof inviteParticipantSchema>;
