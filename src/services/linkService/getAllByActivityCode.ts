import { httpClient } from "../../lib/axios";

import { Link } from "../../entities/link";

export async function getAllByActivityCode(activityCode: string) {
  const { data } = await httpClient.get<Link[]>(
    `activities/${activityCode}/links`,
  );

  return data;
}
