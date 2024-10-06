import { useQuery } from "@tanstack/react-query";

import { tripService } from "../services/trip-service";

export function useTrip(tripCode: string) {
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["trip", tripCode],
    queryFn: async () => tripService.getByCode(tripCode),
  });

  return {
    trip: data,
    errorTrip: error,
    isFetchingTrip: isFetching,
    refetchTrip: refetch,
  };
}
