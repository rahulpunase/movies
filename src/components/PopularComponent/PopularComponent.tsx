import { FC, useEffect, useState } from "react";
import { IMediaType } from "src/interfaces/IMovie.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import PopularItem from "./PopularItem";
import styles from "./PopularComponent.module.scss";
import { Button, Col, Drawer, Row, Typography } from "antd";
import IconButton from "src/lib/IconButton/IconButton";
import {
  faAdd,
  faCheck,
  faInfo,
  faPlay,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { MvImage } from "../MvImage/MvImage";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, TRootState } from "src/redux/store";
import {
  addItemToFavorite,
  removeItemFromFavorite,
} from "src/redux/ducks/profile.slice";
import utils from "../../utils/utils";
import { TransitionSmoothly } from "../TransitionSmoothly/TransitionSmoothly";
import { Icon } from "src/lib";

const { Title, Paragraph } = Typography;

interface IPopularComponent {
  data: Array<{
    name: string;
    poster_path: string;
    media_type: IMediaType;
    id: number;
    overview: string;
  }>;
}

const PopularComponent: FC<IPopularComponent> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, isAuthenticated } = useSelector(
    (store: TRootState) => store.profilereducer
  );

  const [activeData, setActiveData] = useState(data[0]);
  const [isBottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openBottomDrawer = () => {
    setBottomDrawerVisible(true);
  };
  const setActiveSlide = (index: number) => {
    setActiveData(data[index]);
  };

  const toggleFavorites = () => {
    if (!isAuthenticated) {
      return utils.showError("Please login to add items to your favorites.");
    }
    setIsLoading(true);
    if (!isInFavorites) {
      dispatch(
        addItemToFavorite({
          media_type: activeData.media_type,
          media_id: activeData.id,
          item_json: JSON.stringify(activeData),
        })
      ).then((_) => setIsLoading(false));
    } else {
      dispatch(
        removeItemFromFavorite({
          media_id: activeData.id,
        })
      ).then((_) => setIsLoading(false));
    }
  };

  useEffect(() => {
    const item = favorites.results.find(
      (fav) => fav.media_id === activeData.id
    );
    setIsInFavorites(!!item);
  }, [activeData, favorites]);

  return (
    <div className={styles.PopularComponent}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          dynamicBullets: true,
        }}
        onSlideChange={(ev) => setActiveSlide(ev.activeIndex)}
        lazy={true}
        keyboard={true}
        className="custom-swiper"
        modules={[Pagination]}
      >
        {data.map((item) => (
          <SwiperSlide key={`${item.media_type}_${item.id}`}>
            <PopularItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`position-absolute w-100 ${styles.bottom} pa-2`}
        style={{
          bottom: "-24px",
        }}
      >
        <Row>
          <Col span={6} className="d-flex justify-center">
            <IconButton
              disabled={isLoading}
              icon={
                <TransitionSmoothly
                  toggleCondition={isInFavorites}
                  elementOne={<Icon icon={faAdd} />}
                  elementTwo={<Icon icon={faCheck} />}
                />
              }
              label="Favorites"
              onClick={() => toggleFavorites()}
            />
          </Col>
          <Col span={6} className="d-flex justify-center">
            <IconButton icon={<Icon icon={faTicket} />} label="Watchlist" />
          </Col>
          <Col span={6} className="d-flex justify-center">
            <IconButton icon={<Icon icon={faPlay} />} label="Play trailer" />
          </Col>
          <Col span={6} className="d-flex justify-center">
            <IconButton
              icon={<Icon icon={faInfo} />}
              label="Info"
              onClick={() => openBottomDrawer()}
            />
          </Col>
        </Row>
      </div>
      <Drawer
        title={
          <Title className="pa-4" level={4}>
            {activeData.name}
          </Title>
        }
        placement="bottom"
        onClose={() => setBottomDrawerVisible(false)}
        visible={isBottomDrawerVisible}
        key={""}
        height="auto"
      >
        <Row className="pa-4 pt-0">
          <Col span={8}>
            <MvImage
              srcPath={activeData.poster_path}
              size="h632"
              style={{
                maxHeight: "191px",
              }}
            />
          </Col>
          <Col span={16}>
            <Paragraph className="ml-4">{activeData.overview}</Paragraph>
          </Col>
          <Col span={24} className="mt-4">
            <Link to={`/${activeData.media_type}/${activeData.id}`}>
              <Button type="primary" block>
                See Details
              </Button>
            </Link>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default PopularComponent;
