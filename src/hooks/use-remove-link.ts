import { useMutation } from "@tanstack/react-query";

import { linkService } from "../services/link-service";

interface RemoveLinkProps {
  activityCode: string;
  linkCode: string;
}

export function useRemoveLink() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: RemoveLinkProps) => linkService.remove(data),
  });

  return { isPendingRemoveLink: isPending, removeLink: mutateAsync };
}
