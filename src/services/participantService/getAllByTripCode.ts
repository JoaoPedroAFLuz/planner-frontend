import { Participant } from "../../entities/participant";
import { httpClient } from "../../lib/axios";

export async function getAllByTripCode(tripCode: string) {
  const { data } = await httpClient.get<Participant[]>(
    `/trips/${tripCode}/participants`,
  );

  return data;
}
