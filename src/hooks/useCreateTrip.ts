import { useMutation } from "@tanstack/react-query";

import { tripService } from "../services/tripService";

interface CreateTripProps {
  ownerName: string;
  ownerEmail: string;
  destination: string;
  emailsToInvite: string[];
  startsAt: Date;
  endsAt: Date;
}

interface CreateTripResponse {
  tripCode: string;
}

export function useCreateTrip() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateTripProps): Promise<CreateTripResponse> =>
      tripService.create(data),
  });

  return { isPending, mutateAsync };
}
