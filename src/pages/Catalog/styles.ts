import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import Pagination, { PaginationProps } from "@mui/material/Pagination";

export const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 1050px;
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 150px;
  justify-items: center;

  max-width: 1000px;

  @media (max-width: 1070px) {
    padding: 0 5vw;

    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 780px) {
    padding: 0 0;
    grid-row-gap: 120px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
  width: 300px;
  height: 425px;
  padding: 15px 15px;

  border-radius: 30px;
  background-color: #fffceb;

  @media (max-width: 1070px) {
    width: 300px;
  }

  cursor: pointer;

  :hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

export const SpinnerContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationContainer = styled.div`
  height: 100px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 780px) {
    height: 120px;
  }
`;

export const FormattedPagination = muiStyled(Pagination)<PaginationProps>(
  () => ({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        background: "#96c0b7",
        "&:hover": {
          backgroundColor: "#96c0b7",
        },
      },
    },
  })
);
