import { useMutation } from "@tanstack/react-query";

import { linkService } from "../services/linkService";

interface CreateLinkProps {
  tripCode: string;
  title: string;
  url: string;
}

export function useCreateLink() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateLinkProps) => linkService.create(data),
  });

  return { isPending, mutateAsync };
}
