import { httpClient } from "../../lib/axios";

interface CreateLinkProps {
  tripCode: string;
  title: string;
  occursAt: string;
}

export async function create({ tripCode, title, occursAt }: CreateLinkProps) {
  await httpClient.post(`/trips/${tripCode}/activities`, {
    title,
    occursAt,
  });
}
