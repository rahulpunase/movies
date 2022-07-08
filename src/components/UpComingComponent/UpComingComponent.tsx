import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Col, Modal, Row, Typography } from "antd";
import { MvImage } from "../MvImage/MvImage";
import styles from "./UpComingComponent.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import UpComingItem from "./UpComingItem";
import MovieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";

const { Title } = Typography;

const UpComingComponent = ({ data }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalData, setModalData] = useState("");
  const getVideos = (item: any) => {
    MovieDbApiServices.getVideos("movie", item.id).then((response) => {
      const videos = response.results;
      const trailer = videos.find((video: any) => video.type === "Trailer");
      if (trailer) {
        setModalData(trailer.key);
      }
    });
  };
  return (
    <div className={` position-relative ${styles.UpComingComponent}`}>
      <div className="position-absolute w-100 h-100">
        {data && (
          <Row className={`position-absolute w-100 h-100 ${styles.fixedBc}`}>
            <MvImage
              srcPath={data[activeIndex]?.poster_path}
              size="w1920_and_h427_multi_faces"
            />
          </Row>
        )}
        <div className={`${styles.grad} position-absolute w-100 h-100`}></div>
      </div>
      <Row>
        <Col span={24} className="pt-7 pl-4">
          <Title level={4}>Up Coming</Title>
        </Col>
        <Col span={24}>
          <Swiper
            className="mySwiper"
            slidesPerView={2.4}
            spaceBetween={20}
            onSlideChange={(_) => setActiveIndex(_.activeIndex)}
            modules={[Navigation]}
            navigation
          >
            {data &&
              data.map((item: any) => (
                <SwiperSlide className="mt-4 mb-4 ml-4">
                  <UpComingItem item={item} onPlay={getVideos} />
                </SwiperSlide>
              ))}
          </Swiper>
        </Col>
      </Row>

      <Modal
        centered
        visible={!!modalData}
        width={1000}
        onCancel={() => setModalData("")}
        footer={false}
        destroyOnClose
        className="pa-0"
      >
        {modalData ? (
          <iframe
            width="100%"
            height="600px"
            src={`https://www.youtube.com/embed/${modalData}`}
            title="YouTube video player"
            frameBorder={0}
            allowFullScreen
          />
        ) : null}
      </Modal>
    </div>
  );
};

export default UpComingComponent;
