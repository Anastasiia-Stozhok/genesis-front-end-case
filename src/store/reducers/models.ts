import { ICourseProps } from "../../common";

export interface ICoursePagePersistState {
  token: string;
  coursesTime: { [key: string]: Array<number> };
}

export interface ISetWatchedTime {
  courseId: string;
  lessonNum: number;
  time: number;
}

export interface ISetInitTime {
  courses: Array<ICourseProps>;
}
