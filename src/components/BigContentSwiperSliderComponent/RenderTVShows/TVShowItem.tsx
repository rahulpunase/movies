import { Card } from "antd";
import React, { FC } from "react";
import { MvImage } from "src/components/MvImage/MvImage";
import { ITVShowItem } from "src/interfaces/ITvShow.interface";
import { BottomContainer } from "../BottomContainer/BottomContainer";

interface IRenderTVShowItem {
  item: ITVShowItem;
}

export const TVShowItem: FC<IRenderTVShowItem> = ({ item }) => {
  return (
    <Card
      style={{ height: "470px", position: "relative" }}
      bordered={false}
      cover={<MvImage size="w600_and_h900_bestv2" srcPath={item.poster_path} />}
    >
      <BottomContainer name={item.name} />
    </Card>
  );
};
