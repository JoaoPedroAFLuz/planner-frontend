import { useQuery } from "@tanstack/react-query";

import { linkService } from "../services/linkService";

export function useLinksByActivityCode(activityCode: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["links", activityCode],
    queryFn: async () => linkService.getAllByActivityCode(activityCode),
  });

  return { links: data || [], isFetching, refetch };
}
