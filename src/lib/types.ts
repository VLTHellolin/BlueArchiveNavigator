import { Dayjs } from 'dayjs';

export interface Image {
  name: string; // As key
  hash: string;
  img: Blob;
}
export interface Event {
  name: string;
  picture?: string;
  begin: Dayjs;
  end: Dayjs;
  server: number;
}
interface AronaResponseData {
  name: string;
  hash: string;
  content: string;
  type: string;
}
export interface AronaResponse {
  code: number;
  message: string;
  data: AronaResponseData[];
}
interface GamekeeResponseData {
  id: number;
  title: string;
  link_url: string;
  picture: string;
  description: string;
  begin_at: number;
  end_at: number;
  importance: number;
  count_down: number;
  pub_area: string;
}
export interface GamekeeResponse {
  code: number;
  msg: string;
  data: GamekeeResponseData[];
}
interface SchaleDBResponseData {
  // Partial useful data
  Name: string;
  IsReleased: [boolean, boolean, boolean];
  Birthday: string;
}
export type SchaleDBResponse = SchaleDBResponseData[];
