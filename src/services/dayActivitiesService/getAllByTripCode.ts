import { DayActivities } from "../../entities/dayActivities";
import { httpClient } from "../../lib/axios";

export async function getAllByTripCode(tripCode: string) {
  const { data } = await httpClient.get<DayActivities[]>(
    `trips/${tripCode}/activities`,
  );

  return data;
}
