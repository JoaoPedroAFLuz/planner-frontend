import { httpClient } from "@/libs/axios";

import { Trip } from "@entities/trip";

export async function getByCode(tripCode: string) {
  const { data } = await httpClient.get<Trip>(`trips/${tripCode}`);

  return data;
}
