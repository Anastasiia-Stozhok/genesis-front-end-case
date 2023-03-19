import { ICourseProps } from "../../common";

export interface ICourseCardProps {
  data: ICourseProps;
  handleCardClick: () => void;
}

export interface IVideoProps {
  show: boolean;
}
