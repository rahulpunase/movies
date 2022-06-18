import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography } from "antd";
import { AppDispatch, TRootState } from "src/redux/store";
import { fetchPopularTVShows } from "src/redux/ducks/content.slice";
import styles from "../BigContentSwiperSliderComponent.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { ITVShowItem } from "src/interfaces/ITvShow.interface";
import { TVShowItem } from "./TVShowItem";

const { Title } = Typography;

const RenderTVShows = () => {
  const { contentReducer } = useSelector((store: TRootState) => store);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPopularTVShows());
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
        lazy={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        keyboard={true}
        modules={[Pagination, Lazy]}
        className="mySwiper"
      >
        {contentReducer.popularTvShows &&
          contentReducer.popularTvShows.results.map((item) => (
            <SwiperSlide key={`tv_${item.id}`}>
              <TVShowItem item={item as ITVShowItem} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RenderTVShows;
