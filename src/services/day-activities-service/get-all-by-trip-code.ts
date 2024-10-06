import { httpClient } from "@libs/axios";

import { DayActivitiesDTO } from "@dtos/day-activities";

export async function getAllByTripCode(tripCode: string) {
  const { data } = await httpClient.get<DayActivitiesDTO[]>(
    `trips/${tripCode}/activities`,
  );

  return data;
}
