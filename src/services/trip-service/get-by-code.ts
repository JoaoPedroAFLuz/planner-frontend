import { httpClient } from "@libs/axios";

import { TripDTO } from "@dtos/trip";

export async function getByCode(tripCode: string) {
  const { data } = await httpClient.get<TripDTO>(`trips/${tripCode}`);

  return data;
}
