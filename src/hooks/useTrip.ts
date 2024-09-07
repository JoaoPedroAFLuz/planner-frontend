import { useQuery } from "@tanstack/react-query";

import { tripService } from "../services/tripService";

export function useTrip(tripCode: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["trip", tripCode],
    queryFn: async () => tripService.getByCode(tripCode),
  });

  return { trip: data, isFetching, refetch };
}
