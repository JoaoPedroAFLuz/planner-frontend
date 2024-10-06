import { useMutation } from "@tanstack/react-query";

import { activityService } from "../services/activity-service";

interface RemoveActivityProps {
  tripCode: string;
  activityCode: string;
}

export function useRemoveActivity() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: RemoveActivityProps) =>
      activityService.remove(data),
  });

  return { isPending, removeActivity: mutateAsync };
}
