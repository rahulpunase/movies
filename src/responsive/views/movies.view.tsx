import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MvImage } from "src/components/MvImage/MvImage";
import { fetchPopularMovies } from "src/redux/ducks/content.slice";
import { AppDispatch, TRootState } from "src/redux/store";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const MovieView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies } = useSelector(
    (store: TRootState) => store.contentReducer
  );
  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, []);
  return (
    <Row>
      <Col span={24}>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          lazy={true}
          keyboard={true}
          className="mySwiper"
          modules={[Navigation]}
        >
          {!popularMovies.isLoading
            ? popularMovies.results.map((item) => (
                <SwiperSlide>
                  <MvImage srcPath={item.poster_path} size="w300"></MvImage>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </Col>
    </Row>
  );
};

export default MovieView;
