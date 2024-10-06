import { useQuery } from "@tanstack/react-query";

import { linkService } from "../services/link-service";

export function useLinksByActivityCode(activityCode: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["links", activityCode],
    queryFn: async () => linkService.getAllByActivityCode(activityCode),
  });

  return {
    links: data || [],
    isFetchingLinks: isFetching,
    refetchLinks: refetch,
  };
}
