import { useQuery } from "@tanstack/react-query";

import { dayActivitiesService } from "../services/day-activities-service";

export function useDayActivitiesByTripCode(tripCode: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["dayActivities", tripCode],
    queryFn: async () => dayActivitiesService.getAllByTripCode(tripCode),
  });

  return {
    dayActivities: data || [],
    isFetchingDayActivities: isFetching,
    refetchDayActivities: refetch,
  };
}
