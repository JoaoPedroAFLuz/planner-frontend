import { create } from "./create";
import { getAllByActivityCode } from "./get-all-by-activity-code";
import { remove } from "./remove";

export const linkService = {
  getAllByActivityCode,
  create,
  remove,
};
