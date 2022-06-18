import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography } from "antd";
import { AppDispatch, TRootState } from "src/redux/store";
import { fetchPopularMovies } from "src/redux/ducks/content.slice";
import styles from "../BigContentSwiperSliderComponent.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { MovieItem } from "./MovieItem";

const { Title } = Typography;

const RenderMovies = () => {
  const { contentReducer } = useSelector((store: TRootState) => store);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <div
      style={{
        width: "100%",
      }}
      className={styles.BigContentSwiperSliderComponent}
    >
      <Title level={4}>Popular Movies</Title>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        lazy={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        keyboard={true}
        modules={[Pagination, Lazy]}
        className="mySwiper"
      >
        {contentReducer.popularMovies &&
          contentReducer.popularMovies.results.map((item) => (
            <SwiperSlide key={`movie_${item.id}`}>
              <MovieItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RenderMovies;
