import { FC } from "react";
import { Link } from "react-router-dom";
import { MvImage } from "src/components/MvImage/MvImage";
import { ITVShowItem } from "src/interfaces/IMovie.interface";
import { BottomContainer } from "../BottomContainer/BottomContainer";
import styles from "../BigContentSwiperSliderComponent.module.scss";
import ItemAuthDropDownComponent from "src/components/ItemAuthDropDownComponent/ItemAuthDropDownComponent";

interface IRenderTVShowItem {
  item: ITVShowItem;
}

export const TVShowItem: FC<IRenderTVShowItem> = ({ item }) => {
  return (
    <div className={styles.itemComponent}>
      <ItemAuthDropDownComponent item={item} type="movie" />
      <Link to={`/tv/${item.id}/?filter=`}>
        <MvImage size="w600_and_h900_bestv2" srcPath={item.poster_path} />
      </Link>
      <BottomContainer
        name={item.name}
        rating={item.vote_average}
        overview={item.overview}
      />
    </div>
  );
};
