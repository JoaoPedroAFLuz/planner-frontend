import { useQuery } from "@tanstack/react-query";

import { tripService } from "../services/trip-service";

export function useTrips() {
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => tripService.getAll(),
  });

  return {
    trips: data || [],
    tripsError: error,
    isFetchingTrips: isFetching,
    refetchTrips: refetch,
  };
}
