import { Card, Typography } from "antd";
import React, { FC } from "react";
import { MvImage } from "src/components/MvImage/MvImage";
import { IMovieItem } from "src/interfaces/IMovie.interface";
import { BottomContainer } from "../BottomContainer/BottomContainer";

interface IRenderMovieItem {
  item: IMovieItem;
}

export const MovieItem: FC<IRenderMovieItem> = ({ item }) => {
  return (
    <div style={{ height: "470px", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100",
        }}
      >
        <MvImage size="w600_and_h900_bestv2" srcPath={item.poster_path} />
      </div>
      <BottomContainer name={item.original_title} />
    </div>
  );
};
