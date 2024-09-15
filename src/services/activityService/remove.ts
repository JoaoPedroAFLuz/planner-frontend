import { httpClient } from "@libs/axios";

interface RemoveProps {
  tripCode: string;
  activityCode: string;
}

export async function remove({ tripCode, activityCode }: RemoveProps) {
  await httpClient.delete(`/trips/${tripCode}/activities/${activityCode}`);
}
