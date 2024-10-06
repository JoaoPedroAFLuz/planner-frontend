import { getAllByTripCode } from "./get-all-by-trip-code";
import { inviteToTrip } from "./invite";
import { removeFromTrip } from "./remove";

export const participantService = {
  getAllByTripCode,
  inviteToTrip,
  removeFromTrip,
};
