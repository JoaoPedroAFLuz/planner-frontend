import { ActivityDTO } from "./activity";

export interface DayActivitiesDTO {
  date: string;
  activities: ActivityDTO[];
}
