import { useMutation } from "@tanstack/react-query";

import { UpdateActivityDTO } from "@dtos/update-activity";
import { activityService } from "@services/activity-service";

export function useUpdateActivity() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateActivityDTO) => activityService.update(data),
  });

  return {
    isPendingActivityUpdate: isPending,
    updateActivity: mutateAsync,
  };
}
