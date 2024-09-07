import { useMutation } from "@tanstack/react-query";

import { participantService } from "../services/participantService";

interface InviteParticipantToTripProps {
  tripCode: string;
  email: string;
}

export function useInviteParticipantToTrip() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: InviteParticipantToTripProps) =>
      participantService.inviteToTrip(data),
  });

  return { isPending, inviteParticipantsToTrip: mutateAsync };
}
