import { Link } from "../../entities/link";
import { httpClient } from "../../lib/axios";

export async function getAllByActivityCode(activityCode: string) {
  const { data } = await httpClient.get<Link[]>(
    `activities/${activityCode}/links`,
  );

  return data;
}
