import { FC } from "react";
import { MvImage } from "src/components/MvImage/MvImage";
import { IMovieItem } from "src/interfaces/IMovie.interface";
import { BottomContainer } from "../BottomContainer/BottomContainer";
import styles from "../BigContentSwiperSliderComponent.module.scss";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { Icon } from "src/lib";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { TRootState } from "src/redux/store";
import BigMenuComponent from "../BigMenuComponent/BigMenuComponent";
import ItemAuthDropDownComponent from "src/components/ItemAuthDropDownComponent/ItemAuthDropDownComponent";

interface IRenderMovieItem {
  item: IMovieItem;
}

export const MovieItem: FC<IRenderMovieItem> = ({ item }) => {
  const { isAuthenticated } = useSelector(
    (store: TRootState) => store.profilereducer
  );

  return (
    <div className={styles.itemComponent}>
      <ItemAuthDropDownComponent item={item} type="movie" />
      <Link to={`/movie/${item.id}/?filter=`}>
        <MvImage size="w600_and_h900_bestv2" srcPath={item.poster_path} />
      </Link>
      <BottomContainer
        name={item.original_title}
        rating={item.vote_average}
        overview={item.overview}
      />
    </div>
  );
};
