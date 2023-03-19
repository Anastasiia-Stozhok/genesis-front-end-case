import styled from "styled-components";
import { T1 } from "../../assets";

export const Title = styled(T1)`
  text-align: center;
  margin: 20px 0;
  @media (max-width: 520px) {
    font-size: 30px;
  }
`;

export const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5vw;

  @media (max-width: 1150px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const VideoCardsContainer = styled.div`
  width: 500px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media (max-width: 520px) {
    width: 350px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const VideoPartContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 500px;
  align-items: center;

  @media (max-width: 520px) {
    width: 320px;
  }
`;

export const SpinnerContainer = styled.div`
  height: 100vh;
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

export const Video = styled.video`
  width: 500px;
  height: 280px;
  margin-bottom: 30px;

  @media (max-width: 520px) {
    width: 320px;
    height: 240px;
  }
`;

export const LockedInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 280px;
  margin-bottom: 30px;

  @media (max-width: 520px) {
    width: 320px;
    height: 240px;
  }
`;
