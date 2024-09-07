import { httpClient } from "@/libs/axios";

import { Participant } from "@entities/participant";

export async function getAllByTripCode(tripCode: string) {
  const { data } = await httpClient.get<Participant[]>(
    `/trips/${tripCode}/participants`,
  );

  return data;
}
