import { httpClient } from "../../lib/axios";

interface InviteProps {
  tripCode: string;
  email: string;
}

export async function inviteToTrip({ tripCode, email }: InviteProps) {
  await httpClient.post(`/trips/${tripCode}/participants`, {
    email,
  });
}
