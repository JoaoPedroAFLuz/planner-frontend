import { useQuery } from "@tanstack/react-query";

import { linkService } from "../services/linkService";

export function useLinksByTripCode(tripCode: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["links", tripCode],
    queryFn: async () => linkService.getAllByTripCode(tripCode),
  });

  return { links: data || [], isFetching, refetch };
}
