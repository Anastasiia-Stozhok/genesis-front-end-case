export interface IMeta {
  slug: string;
  skills: Array<string>;
  courseVideoPreview: {
    link: string;
    duration: number;
    previewImageLink: string;
  };
}

export interface ICourseProps {
  id: string;
  title: string;
  tags: Array<string>;
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: IMeta;
}

export interface ILessonProps {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: string;
  link: string;
  previewImageLink: string;
  meta: null;
}
