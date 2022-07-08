import { Col, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import RenderSmoothly from "../RenderSmoothly/RenderSmoothly";

interface IMultiVideoPlayerComponent {
  videos: Array<any>;
}

const { Title, Text } = Typography;

const MultiVideoPlayerComponent: React.FC<IMultiVideoPlayerComponent> = ({
  videos,
}) => {
  const _mainVideo = videos ? videos[0] : null;
  const [mainVideo, setMainVideo] = useState(_mainVideo);
  useEffect(() => {
    const trailer = videos.find((video) => video.type === "Trailer");
    setMainVideo(trailer);
  }, [videos]);
  return (
    mainVideo && (
      <RenderSmoothly>
        <Row className="mt-4">
          <Col span={24}>
            <Title className="custom-side-line" level={2}>
              Videos
            </Title>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={18} style={{ height: "415px" }}>
                <iframe
                  width="100%"
                  height="415px"
                  src={`https://www.youtube.com/embed/${mainVideo.key}`}
                  title="YouTube video player"
                  frameBorder={0}
                  allowFullScreen
                ></iframe>
              </Col>
              <Col span={6} style={{ height: "415px" }}>
                <Swiper
                  style={{ height: "100%" }}
                  direction={"vertical"}
                  pagination={{
                    clickable: true,
                  }}
                  className="mySwiper"
                  navigation={true}
                  modules={[Pagination]}
                  slidesPerView={3.2}
                  scrollbar
                >
                  {videos.map((video, indKey) => (
                    <SwiperSlide key={indKey}>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          preview={false}
                          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                          onClick={() => setMainVideo(video)}
                        ></Image>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="mt-3">
            <div>
              <Text>{mainVideo.name}</Text>
            </div>
          </Col>
        </Row>
      </RenderSmoothly>
    )
  );
};

export default MultiVideoPlayerComponent;
