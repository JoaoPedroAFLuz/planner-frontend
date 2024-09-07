import { useMutation } from "@tanstack/react-query";

import { linkService } from "../services/linkService";

interface RemoveLinkProps {
  activityCode: string;
  linkCode: string;
}

export function useRemoveLink() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: RemoveLinkProps) => linkService.remove(data),
  });

  return { isPending, removeLink: mutateAsync };
}
