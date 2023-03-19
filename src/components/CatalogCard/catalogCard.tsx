import { useRef, useState } from "react";
import Hls from "hls.js";
import { ST1, N1, N2 } from "../../assets";
import { CardWrapper, Title, Image, Video } from "./styles";
import { ICourseCardProps } from "./models";

export const CatalogCard: React.FC<ICourseCardProps> = ({
  data,
  handleCardClick,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function playVideo() {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(data.meta.courseVideoPreview.link);
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls.destroy();
        }
      });

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setShowVideo(true))
          .catch(() => {
            // add error handling
          });
      }
    }
  }

  return (
    <CardWrapper
      onClick={handleCardClick}
      onMouseEnter={() => {
        playVideo();
      }}
      onMouseLeave={() => {
        setShowVideo(false);
        videoRef?.current?.pause();
      }}
    >
      <Title>{data.title}</Title>
      <Video autoPlay={showVideo} muted show={showVideo} ref={videoRef} />
      <Image src={`${data.previewImageLink}/cover.webp`} alt="course-img" />
      <ST1 style={{ marginBottom: "10px" }}>{data.description}</ST1>
      <br />
      <N1 style={{ lineHeight: "25px" }}>
        <N2>Rating:&nbsp;</N2>
        {data.rating}
        <br />
        <N2>Lessons Count:&nbsp;</N2>
        {data.lessonsCount}
        <br />
        <N2>Skills:&nbsp;</N2>
        {data.meta.skills !== undefined
          ? data.meta.skills.map((skill, index) => {
              return index === data.meta.skills.length - 1
                ? `${skill.trim()}.`
                : `${skill.trim()}, `;
            })
          : "-"}
      </N1>
    </CardWrapper>
  );
};
