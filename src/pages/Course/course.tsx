import { useEffect, useState, useRef } from "react";
import { AxiosError } from "axios";
import Hls from "hls.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";
import { ST1 } from "../../assets";
import { axiosInstance, apiUrl } from "../../common";
import { VideoCard } from "../../components";
import {
  useAppDispatch,
  useAppSelector,
  coursePagePersistSlice,
} from "../../store";
import { IGetLessonsResponse, ILessonsData } from "./models";
import {
  PageWrapper,
  Title,
  SpinnerContainer,
  TitleContainer,
  VideoCardsContainer,
  VideoPartContainer,
  ContentContainer,
  Video,
  LockedInfo,
} from "./styles";

export const CoursePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { token, coursesTime } = useAppSelector(
    (state) => state.persistedReducer.coursePage
  );
  const { setWatchedTime } = coursePagePersistSlice.actions;
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState({} as ILessonsData);
  const [curLesson, setCurLesson] = useState(0);
  const [showError, setShowError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (coursesTime === undefined) navigate("/");
    async function getLessons(token: string) {
      try {
        const response = await axiosInstance.get<IGetLessonsResponse>(
          `${apiUrl}core/preview-courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse({
          title: response.data.title,
          description: response.data.description,
          lessons: response.data.lessons.sort((f, s) => f.order - s.order),
        });
      } catch (error) {
        // add error handling
        if (error instanceof AxiosError && error.response?.status === 401)
          navigate("/");
      }
    }
    getLessons(token);
  }, []);

  useEffect(() => {
    if (
      Hls.isSupported() &&
      videoRef.current &&
      course.lessons[curLesson].status === "unlocked" &&
      id
    ) {
      const hls = new Hls();
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(course.lessons[curLesson].link);
      });

      videoRef.current.currentTime = coursesTime[id][curLesson];
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          setShowError(true);
          // add error handling
        }
      });
    }
  }, [course, curLesson]);

  function handleCardClick(cardNum: number) {
    setShowError(false);
    setCurLesson(cardNum);
  }

  return (
    <PageWrapper>
      {course.title ? (
        <>
          <TitleContainer>
            <Title>{course.title}</Title>
          </TitleContainer>
          <ContentContainer>
            <VideoCardsContainer>
              {course.lessons.map((lesson, index) => (
                <VideoCard
                  key={index}
                  handleCardClick={() => handleCardClick(index)}
                  active={curLesson === index}
                  shake={course.lessons[index].status === "locked"}
                  lesson={lesson}
                  finishedTime={id ? coursesTime[id][index] : 0}
                />
              ))}
            </VideoCardsContainer>
            <VideoPartContainer>
              {!showError &&
              course.lessons[curLesson].status === "unlocked" &&
              course.lessons[curLesson].link ? (
                <Video
                  controls
                  ref={videoRef}
                  onTimeUpdate={() => {
                    if (id && videoRef.current)
                      dispatch(
                        setWatchedTime({
                          courseId: id,
                          lessonNum: curLesson,
                          time: videoRef.current.currentTime,
                        })
                      );
                  }}
                />
              ) : (
                <LockedInfo>
                  <Title>
                    {!course.lessons[curLesson].link || showError
                      ? "Sorry, no video provided("
                      : "This lesson is locked!"}
                  </Title>
                </LockedInfo>
              )}
              <ST1 style={{ display: "block" }}>{course.description}</ST1>
            </VideoPartContainer>
          </ContentContainer>
        </>
      ) : (
        <SpinnerContainer>
          <CircularProgress size={100} sx={{ color: "#82645E" }} />
        </SpinnerContainer>
      )}
    </PageWrapper>
  );
};
