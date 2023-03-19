import { IMeta, ILessonProps } from "../../common";

export interface IGetLessonsResponse {
  id: string;
  title: string;
  tags: Array<string>;
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  lessons: Array<ILessonProps>;
  meta: IMeta;
  containsLockedLessons: boolean;
}

export interface ILessonsData {
  title: string;
  description: string;
  lessons: Array<ILessonProps>;
}
