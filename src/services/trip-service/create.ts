import { httpClient } from "@libs/axios";

interface CreateTripProps {
  destination: string;
  participantsEmail: string[];
  startsAt: Date;
  endsAt: Date;
}

interface CreateTripResponse {
  tripCode: string;
}

export async function create({
  destination,
  participantsEmail,
  startsAt,
  endsAt,
}: CreateTripProps) {
  const { data } = await httpClient.post<CreateTripResponse>("/trips", {
    destination,
    participantsEmail,
    startsAt,
    endsAt,
  });

  return data;
}
