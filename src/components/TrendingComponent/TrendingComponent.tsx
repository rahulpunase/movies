import { Col, Row, Typography } from "antd";
import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TrendingItem from "./TrendingItem";
import "swiper/css";
import { IMovieItem, ITVShowItem } from "src/interfaces/IMovie.interface";
import ItemAuthDropDownComponent from "../ItemAuthDropDownComponent/ItemAuthDropDownComponent";
import { MvImage } from "../MvImage/MvImage";
import { debounce, values, throttle } from "lodash";
import RenderSmoothly from "../RenderSmoothly/RenderSmoothly";

interface ITrendingComponent {
  data: Array<IMovieItem> | Array<ITVShowItem>;
}

const { Title } = Typography;

const TrendingComponent: FC<ITrendingComponent> = ({ data }) => {
  const [overDivVal, setOverDivVal] = useState<any>();
  let timer: any = null;
  const onHover = (val: any) => {
    // setOverDivVal(val);
    // timer = setTimeout(function () {
    //   setOverDivVal(val);
    // }, 500);
  };
  const onHoverOut = () => {
    clearTimeout(timer);
  };
  return (
    <Row>
      <Col span={24}>
        <Title level={4}>Trendings</Title>
      </Col>
      <Col span={24}>
        {overDivVal && (
          <div
            onMouseLeave={() => setOverDivVal(null)}
            className="position-fixed"
            style={{
              height: `${overDivVal.rect.height}px`,
              width: `${overDivVal.rect.width}px`,
              top: `${overDivVal.rect.top}px`,
              left: `${overDivVal.rect.left}px`,
              transform: `scale(1.2)`,
              zIndex: 3,
              transition: `all 0.3s ease-in-out`,
            }}
          >
            <MvImage srcPath={overDivVal.imagePath} size="w185" />
          </div>
        )}
        <Swiper
          pagination={{
            clickable: true,
          }}
          slidesPerView={3.3}
          className="mySwiper"
        >
          {data.map((trend, index) => (
            <SwiperSlide key={index}>
              <>
                <ItemAuthDropDownComponent
                  item={trend}
                  type={trend.media_type}
                />
                <TrendingItem
                  type="movie"
                  id={trend.id}
                  imagePath={trend.poster_path}
                  onHover={onHover}
                  onHoverOut={onHoverOut}
                />
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  );
};

export default TrendingComponent;
