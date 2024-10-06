import { UpdateActivityDTO } from "@dtos/update-activity";
import { httpClient } from "@libs/axios";

export async function update({
  tripCode,
  activityCode,
  title,
  description,
  occursAt,
}: UpdateActivityDTO) {
  await httpClient.put(`/trips/${tripCode}/activities/${activityCode}`, {
    title,
    description,
    occursAt,
  });
}
