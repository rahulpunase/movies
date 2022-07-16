import { Col, Row } from "antd";
import { FC } from "react";
import { IMediaType } from "src/interfaces/IMovie.interface";
import { MvImage } from "../MvImage/MvImage";

export interface IPopularItem {
  name: string;
  poster_path: string;
  media_type: IMediaType;
  id: number;
  overview: string;
}
const PopularItem: FC<IPopularItem> = ({ poster_path }) => {
  return (
    <Row>
      <Col span={24}>
        <MvImage srcPath={poster_path} size="h632" />
      </Col>
    </Row>
  );
};

export default PopularItem;
