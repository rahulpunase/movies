import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Icon } from "src/lib";
import { MvImage } from "../MvImage/MvImage";
import styles from "./UpComingComponent.module.scss";
import { Typography } from "antd";
import ItemAuthDropDownComponent from "../ItemAuthDropDownComponent/ItemAuthDropDownComponent";

const { Text } = Typography;

const UpComingItem = ({ item, onPlay }: any) => {
  return (
    <div className={styles.upComingItem}>
      <ItemAuthDropDownComponent item={item} type="movie" />
      <div className={styles.onHover} onClick={() => onPlay(item)}>
        <MvImage srcPath={item.poster_path} size="w710_and_h400_multi_faces" />
        <div
          className={`${styles.play} position-absolute d-flex w-100 h-100 justify-center align-center`}
        >
          <Icon icon={faPlay} size="3x"></Icon>
        </div>
      </div>
      <div className="mt-2">
        <Text strong>{item.original_title}</Text>
      </div>
    </div>
  );
};

export default UpComingItem;
