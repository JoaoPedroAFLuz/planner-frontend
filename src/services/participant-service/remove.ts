import { httpClient } from "@libs/axios";

interface RemoveFromTripProps {
  tripCode: string;
  participantCode: string;
}

export async function removeFromTrip({
  tripCode,
  participantCode,
}: RemoveFromTripProps) {
  await httpClient.delete(`/trips/${tripCode}/participants/${participantCode}`);
}
