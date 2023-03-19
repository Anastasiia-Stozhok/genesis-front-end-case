import styled, { keyframes, css } from "styled-components";
import { ICardProps } from "./models";
import { T2, N1 } from "../../assets";

export const Title = styled(T2)`
  text-align: center;
  height: 37px;
`;

export const TimeText = styled(N1)`
  margin-bottom: 10px;
  line-height: 25px;
`;

const shakeAnim = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

export const CardWrapper = styled.div<ICardProps>`
  height: 120px;
  padding: 15px 15px;
  border-radius: 30px;
  background-color: ${(props) => (props.active ? "#96c0b7" : "#fffceb")};

  cursor: pointer;

  :hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }

  transition: 0.15s background-color ease-in-out;
  ${(props) =>
    props.shake && props.active
      ? css`
          animation: ${shakeAnim} 0.2s;
        `
      : css`
          animation: none;
        `}
`;
