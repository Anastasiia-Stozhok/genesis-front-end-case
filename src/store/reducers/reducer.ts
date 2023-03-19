import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICoursePagePersistState,
  ISetWatchedTime,
  ISetInitTime,
} from "./models";

const initialState = {} as ICoursePagePersistState;

export const coursePagePersistSlice = createSlice({
  name: "coursePagePersist",
  initialState,
  reducers: {
    setInitTime(state, action: PayloadAction<ISetInitTime>) {
      state.coursesTime = {};
      action.payload.courses.forEach((course) => {
        state.coursesTime[course.id] = new Array(course.lessonsCount).fill(0);
      });
    },
    setWatchedTime(state, action: PayloadAction<ISetWatchedTime>) {
      state.coursesTime[action.payload.courseId][action.payload.lessonNum] =
        action.payload.time;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});
