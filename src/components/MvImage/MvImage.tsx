import React, { FC, lazy } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "src/redux/store";

type TImageSize =
  | "w300"
  | "w780"
  | "w185"
  | "h632"
  | "w500"
  | "w220_and_h330"
  | "w600_and_h900_bestv2";

interface IMvImage {
  srcPath: string;
  size: TImageSize;
  height?: string;
  width?: string;
  lazy?: boolean;
}

export const MvImage: FC<IMvImage> = ({
  srcPath,
  size,
  height,
  width,
  lazy,
}) => {
  const { configureReducer } = useSelector((store: TRootState) => store);
  return (
    <>
      {lazy ? (
        <img
          data-src={`${configureReducer.config.images.base_url}${size}${srcPath}`}
          height={height ? height : "100%"}
          width={width ? width : "100%"}
          alt=""
        />
      ) : (
        <img
          src={`${configureReducer.config.images.base_url}${size}${srcPath}`}
          height={height ? height : "100%"}
          width={width ? width : "100%"}
          alt=""
        />
      )}
    </>
  );
};
