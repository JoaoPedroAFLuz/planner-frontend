import { httpClient } from "@/libs/axios";

interface DeleteProps {
  activityCode: string;
  linkCode: string;
}

export async function remove({ activityCode, linkCode }: DeleteProps) {
  await httpClient.delete(`/activities/${activityCode}/links/${linkCode}`);
}
