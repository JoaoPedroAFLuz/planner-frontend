import { Link } from "../../entities/link";
import { httpClient } from "../../lib/axios";

export async function getAllByTripCode(tripCode: string) {
  const { data } = await httpClient.get<Link[]>(`trips/${tripCode}/links`);

  return data;
}
