import { httpClient } from "@libs/axios";

import { TripParticipantDTO } from "@dtos/trip-participant";

export async function getAllByTripCode(tripCode: string) {
  const { data } = await httpClient.get<TripParticipantDTO[]>(
    `/trips/${tripCode}/participants`,
  );

  return data;
}
