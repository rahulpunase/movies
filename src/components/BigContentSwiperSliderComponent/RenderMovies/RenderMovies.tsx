import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography } from "antd";
import { AppDispatch, TRootState } from "src/redux/store";
import { fetchPopularMovies } from "src/redux/ducks/content.slice";
import styles from "../BigContentSwiperSliderComponent.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { MovieItem } from "./MovieItem";
import BigLoadingItem from "../BigLoadingItem/BigLoadingItem";
import RenderSmoothly from "src/components/RenderSmoothly/RenderSmoothly";

const { Title } = Typography;

const RenderMovies = () => {
  const { popularMovies } = useSelector(
    (store: TRootState) => store.contentReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!popularMovies.results.length) {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch]);

  const loadingSlides = [0, 1, 2, 3];

  return (
    <div
      style={{
        width: "100%",
      }}
      className={styles.BigContentSwiperSliderComponent}
    >
      <Title level={4}>Popular Movies</Title>
      <Swiper
        slidesPerView={3.2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        lazy={true}
        keyboard={true}
        className="mySwiper"
        modules={[Navigation]}
      >
        {popularMovies.isLoading
          ? loadingSlides.map((i) => (
              <SwiperSlide key={i}>
                <BigLoadingItem />
              </SwiperSlide>
            ))
          : popularMovies.results.map((item) => (
              <SwiperSlide key={`movie_${item.id}`}>
                <RenderSmoothly>
                  <MovieItem item={item} />
                </RenderSmoothly>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default RenderMovies;
