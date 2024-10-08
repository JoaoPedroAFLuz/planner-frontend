import { useMutation } from "@tanstack/react-query";

import { linkService } from "../services/link-service";

interface CreateLinkProps {
  activityCode: string;
  title: string;
  url: string;
}

export function useCreateLink() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateLinkProps) => linkService.create(data),
  });

  return {
    isCreateLinkPending: isPending,
    createLink: mutateAsync,
  };
}
