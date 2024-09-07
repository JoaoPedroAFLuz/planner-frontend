import { useMutation } from "@tanstack/react-query";
import { participantService } from "../services/participantService";

interface InviteParticipantProps {
  tripCode: string;
  email: string;
}

export function useInviteParticipant() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: InviteParticipantProps) =>
      participantService.invite(data),
  });

  return { isPending, mutateAsync };
}
