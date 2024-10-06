import { useMutation } from "@tanstack/react-query";

import { participantService } from "../services/participant-service";

interface RemoveParticipantFromTripProps {
  tripCode: string;
  participantCode: string;
}

export function useRemoveParticipantFromTrip() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: RemoveParticipantFromTripProps) =>
      participantService.removeFromTrip(data),
  });

  return { isPending, removeParticipantFromTrip: mutateAsync };
}
