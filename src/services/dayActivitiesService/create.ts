import { httpClient } from "@/libs/axios";

interface CreateLinkProps {
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
}: CreateLinkProps) {
  await httpClient.post(`/trips/${tripCode}/activities`, {
    title,
    description,
    occursAt,
  });
}
