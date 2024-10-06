import { httpClient } from "@libs/axios";

import { LinkDTO } from "@dtos/link";

export async function getAllByActivityCode(activityCode: string) {
  const { data } = await httpClient.get<LinkDTO[]>(
    `activities/${activityCode}/links`,
  );

  return data;
}
