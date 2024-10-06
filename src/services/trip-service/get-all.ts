import { ResumedTripDTO } from "@dtos/resumed-trip";
import { httpClient } from "@libs/axios";

export async function getAll() {
  const { data } = await httpClient.get<ResumedTripDTO[]>("trips");

  return data;
}
