import { UserDTO } from "@dtos/user";

export interface TripDTO {
  code: string;
  owner: UserDTO;
  destination: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  confirmedAt: string;
}
