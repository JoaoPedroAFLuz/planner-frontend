import { useMutation } from "@tanstack/react-query";

import { tripService } from "../services/trip-service";

interface CreateTripProps {
  destination: string;
  participantsEmail: string[];
  startsAt: Date;
  endsAt: Date;
}

interface CreateTripResponse {
  tripCode: string;
}

export function useCreateTripMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateTripProps): Promise<CreateTripResponse> =>
      tripService.create(data),
  });

  return { isPendingCreateTrip: isPending, createTripMutation: mutateAsync };
}
