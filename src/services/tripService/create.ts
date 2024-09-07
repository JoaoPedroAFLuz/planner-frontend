import { httpClient } from "@/libs/axios";

interface CreateTripProps {
  ownerName: string;
  ownerEmail: string;
  destination: string;
  emailsToInvite: string[];
  startsAt: Date;
  endsAt: Date;
}

interface CreateTripResponse {
  tripCode: string;
}

export async function create({
  ownerName,
  ownerEmail,
  destination,
  emailsToInvite,
  startsAt,
  endsAt,
}: CreateTripProps) {
  const { data } = await httpClient.post<CreateTripResponse>("/trips", {
    ownerName,
    ownerEmail,
    destination,
    emailsToInvite,
    startsAt,
    endsAt,
  });

  return data;
}
