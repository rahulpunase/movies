import { FC, useRef } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "src/redux/store";

type TImageSize =
  | "w92"
  | "w300"
  | "w780"
  | "w185"
  | "h632"
  | "w500"
  | "w220_and_h330"
  | "w600_and_h900_bestv2"
  | "w355_and_h200_multi_faces"
  | "w710_and_h400_multi_faces"
  | "w1920_and_h427_multi_faces";

interface IMvImage {
  srcPath: string;
  size: TImageSize;
  height?: string;
  width?: string;
  lazy?: boolean;
  onErrorImagePath?: string;
}

export const MvImage: FC<IMvImage> = ({
  srcPath,
  size,
  height,
  width,
  lazy,
  onErrorImagePath,
}) => {
  const { configureReducer } = useSelector((store: TRootState) => store);
  const imageRef = useRef<HTMLImageElement>(null);
  const onError = () => {
    if (imageRef.current && onErrorImagePath) {
      imageRef.current.src = onErrorImagePath;
    }
  };
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
          ref={imageRef}
          onError={onError}
        />
      )}
    </>
  );
};
