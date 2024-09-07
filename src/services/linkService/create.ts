import { httpClient } from "../../lib/axios";

interface CreateLinkProps {
  tripCode: string;
  title: string;
  url: string;
}

export async function create({ tripCode, title, url }: CreateLinkProps) {
  await httpClient.post(`/trips/${tripCode}/links`, {
    title,
    url,
  });
}
