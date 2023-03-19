import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useSearchParams } from "react-router-dom";
import { T1 } from "../../assets";
import { axiosInstance, getToken, apiUrl, ICourseProps } from "../../common";
import { CatalogCard } from "../../components";
import { IGetCoursesResponse } from "./models";
import {
  useAppDispatch,
  useAppSelector,
  coursePagePersistSlice,
} from "../../store";
import {
  PageWrapper,
  ContentContainer,
  SpinnerContainer,
  PaginationContainer,
  TitleContainer,
  FormattedPagination,
} from "./styles";

export const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const { token, coursesTime } = useAppSelector(
    (state) => state.persistedReducer.coursePage
  );
  const { setInitTime, setToken } = coursePagePersistSlice.actions;
  const dispatch = useAppDispatch();

  const [cards, setCards] = useState([] as Array<ICourseProps>);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getCourses(token: string) {
      try {
        const response = await axiosInstance.get<IGetCoursesResponse>(
          `${apiUrl}core/preview-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (coursesTime === undefined) dispatch(setInitTime(response.data));
        setCards(
          response.data.courses.sort(
            (a, b) =>
              new Date(b.launchDate).getTime() -
              new Date(a.launchDate).getTime()
          )
        );
      } catch (error) {
        // add error handling
        if (error instanceof AxiosError && error.response?.status === 401) {
          const token = await getToken();
          if (token) dispatch(setToken(token));
        }
      }
    }

    const pageParam = params.get("page");
    if (pageParam) setPage(parseInt(pageParam));

    getCourses(token);
  }, [token]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    setParams({ page: `${value - 1}` });
  };

  return (
    <PageWrapper>
      {cards.length > 0 ? (
        <>
          <TitleContainer>
            <T1 style={{ textAlign: "center" }}>Choose Courses</T1>
          </TitleContainer>
          <ContentContainer>
            {cards.slice(page * 10, page * 10 + 10).map((card, index) => (
              <CatalogCard
                key={index}
                data={card}
                handleCardClick={() => navigate(`/course/${card.id}`)}
              />
            ))}
          </ContentContainer>
          <PaginationContainer>
            <FormattedPagination
              page={page + 1}
              count={Math.ceil(cards.length / 10)}
              onChange={handleChange}
            />
          </PaginationContainer>
        </>
      ) : (
        <SpinnerContainer>
          <CircularProgress size={100} sx={{ color: "#82645E" }} />
        </SpinnerContainer>
      )}
    </PageWrapper>
  );
};
