import { httpClient } from "../../lib/axios";

interface InviteProps {
  tripCode: string;
  email: string;
}

export async function invite({ tripCode, email }: InviteProps) {
  await httpClient.post(`/trips/${tripCode}/invite`, {
    email,
  });
}
