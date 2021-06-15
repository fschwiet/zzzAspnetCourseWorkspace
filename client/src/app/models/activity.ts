import { Profile } from "./profile";

export interface ActivityFormFields {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
}

export interface Activity extends ActivityFormFields {
  hostUsername?: string;
  isCancelled: boolean;
  attendees: Profile[]
  isGoing: boolean;
  isHost: boolean;
  host: Profile;
}