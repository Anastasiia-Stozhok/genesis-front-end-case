import { useState } from "react";
import { Images } from "../../assets";
import { formatedTime } from "./helpers";
import { Title, TimeText, CardWrapper } from "./styles";
import { IVideoCardProps } from "./models";

export const VideoCard: React.FC<IVideoCardProps> = ({
  active,
  lesson,
  shake,
  finishedTime,
  handleCardClick,
}) => {
  const [shakeAnim, setShakeAnim] = useState(false);
  return (
    <CardWrapper
      active={active}
      onClick={() => {
        handleCardClick();
        setShakeAnim(shake);
      }}
      onAnimationEnd={() => setShakeAnim(false)}
      shake={shakeAnim}
    >
      <Title>
        {lesson.order}. {lesson.title}
      </Title>
      <br />
      <img
        style={{ marginTop: "10px" }}
        src={lesson.status === "locked" ? Images.lock : Images.unlock}
      />
      {lesson.status === "unlocked" && (
        <TimeText>
          Finished time:
          {formatedTime(finishedTime)}
        </TimeText>
      )}
    </CardWrapper>
  );
};
