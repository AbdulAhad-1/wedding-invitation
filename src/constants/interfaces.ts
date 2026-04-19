export type IPhase = "loading" | "welcome" | "main";

export interface ICalenderDetails {
  title: string;
  description: string;
  location: string;
  startDateTime: string; // ISO format
  endDateTime: string; // ISO format
}
