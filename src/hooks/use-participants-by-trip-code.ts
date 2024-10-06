import { useQuery } from "@tanstack/react-query";

import { participantService } from "../services/participant-service";

export function useParticipantsByTripCode(tripCode: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["participants", tripCode],
    queryFn: async () => participantService.getAllByTripCode(tripCode),
  });

  return {
    participants: data || [],
    isFetchingGetParticipantsByTripCode: isFetching,
    refetchParticipantsByTripCode: refetch,
  };
}
