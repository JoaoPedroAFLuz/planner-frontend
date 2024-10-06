import { httpClient } from "@libs/axios";

import { DayActivities } from "@entities/day-activities";

export async function getAllByTripCode(tripCode: string) {
  const { data } = await httpClient.get<DayActivities[]>(
    `trips/${tripCode}/activities`,
  );

  return data;
}
