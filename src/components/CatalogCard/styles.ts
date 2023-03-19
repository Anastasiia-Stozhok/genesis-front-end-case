import styled from "styled-components";
import { T2 } from "../../assets";
import { IVideoProps } from "./models";

export const CardWrapper = styled.div`
  position: relative;
  border-radius: 30px;
  background-color: #fffceb;
  padding: 15px 15px;
  width: 300px;
  height: 450px;

  @media (max-width: 1070px) {
    width: 300px;
  }

  cursor: pointer;

  :hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

export const Title = styled(T2)`
  text-align: center;
  height: 36px;
  margin-top: 10px;
`;

export const Image = styled.img`
  width: 300px;
  margin: 20px 0;
`;

export const Video = styled.video<IVideoProps>`
  position: absolute;
  top: 60px;
  left: 15px;
  width: 300px;
  margin-bottom: 30px;

  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: 0.1s opacity ease-in-out;
`;
