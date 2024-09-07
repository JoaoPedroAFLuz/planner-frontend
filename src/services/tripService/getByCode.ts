import { Trip } from "../../entities/trip";
import { httpClient } from "../../lib/axios";

export async function getByCode(tripCode: string) {
  const { data } = await httpClient.get<Trip>(`trips/${tripCode}`);

  return data;
}
