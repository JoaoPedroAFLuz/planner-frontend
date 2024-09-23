import { useMutation } from "@tanstack/react-query";

import { activityService } from "@services/activityService";

interface CreateActivityProps {
  tripCode: string;
  title: string;
  description?: string;
  occursAt: string;
}

export function useCreateActivity() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateActivityProps) =>
      activityService.create(data),
  });

  return {
    isPendingCreateDayActivity: isPending,
    createDayActivity: mutateAsync,
  };
}
