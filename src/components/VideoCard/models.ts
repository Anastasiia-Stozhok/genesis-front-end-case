import { ILessonProps } from "../../common";

export interface IVideoCardProps {
  lesson: ILessonProps;
  finishedTime: number;
  active: boolean;
  shake: boolean;
  handleCardClick: () => void;
}

export interface ICardProps {
  active: boolean;
  shake: boolean;
}
