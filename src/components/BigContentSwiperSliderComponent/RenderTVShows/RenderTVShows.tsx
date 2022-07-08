import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography } from "antd";
import { AppDispatch, TRootState } from "src/redux/store";
import { fetchPopularTVShows } from "src/redux/ducks/content.slice";
import styles from "../BigContentSwiperSliderComponent.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { TVShowItem } from "./TVShowItem";
import BigLoadingItem from "../BigLoadingItem/BigLoadingItem";
import RenderSmoothly from "src/components/RenderSmoothly/RenderSmoothly";

const { Title } = Typography;

const RenderTVShows = () => {
  const { popularTvShows } = useSelector(
    (store: TRootState) => store.contentReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  const loadingSlides = [0, 1, 2, 3];

  useEffect(() => {
    if (!popularTvShows?.results.length) {
      dispatch(fetchPopularTVShows());
    }
  }, [dispatch]);

  return (
    <div
      style={{
        width: "100%",
      }}
      className={styles.BigContentSwiperSliderComponent}
    >
      <Title level={4}>Popular TV shows</Title>
      <Swiper
        slidesPerView={3.2}
        spaceBetween={10}
        lazy={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        keyboard={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {popularTvShows.isLoading
          ? loadingSlides.map((i) => (
              <SwiperSlide key={i}>
                <BigLoadingItem />
              </SwiperSlide>
            ))
          : popularTvShows.results.map((item) => (
              <SwiperSlide key={`movie_${item.id}`}>
                <RenderSmoothly>
                  <TVShowItem item={item} />
                </RenderSmoothly>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default RenderTVShows;
