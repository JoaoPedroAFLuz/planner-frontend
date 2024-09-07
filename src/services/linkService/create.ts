import { httpClient } from "../../lib/axios";

interface CreateLinkProps {
  activityCode: string;
  title: string;
  url: string;
}

export async function create({ activityCode, title, url }: CreateLinkProps) {
  await httpClient.post(`/activities/${activityCode}/links`, {
    title,
    url,
  });
}
