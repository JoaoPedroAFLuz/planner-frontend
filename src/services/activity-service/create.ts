import { httpClient } from "@libs/axios";

interface CreateActivityProps {
  tripCode: string;
  title: string;
  description?: string;
  occursAt: string;
}

export async function create({
  tripCode,
  title,
  description,
  occursAt,
}: CreateActivityProps) {
  await httpClient.post(`/trips/${tripCode}/activities`, {
    title,
    description,
    occursAt,
  });
}
