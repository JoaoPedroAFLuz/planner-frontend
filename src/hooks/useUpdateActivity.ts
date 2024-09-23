import { useMutation } from "@tanstack/react-query";

import { UpdateActivityDTO } from "@dtos/update-activity";
import { activityService } from "@services/activityService";

export function useUpdateActivity() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateActivityDTO) => activityService.update(data),
  });

  return {
    isPendingActivityUpdate: isPending,
    updateActivity: mutateAsync,
  };
}
