import { Col, Image, Row } from "antd";
import React, { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { MvImage } from "../MvImage/MvImage";

interface ITrendingItem {
  imagePath: string;
  id: number;
  type: string;
  onHover?: any;
  onHoverOut?: any;
}

const TrendingItem: FC<ITrendingItem> = ({
  imagePath,
  id,
  type,
  onHover,
  onHoverOut,
}) => {
  const ref = useRef<any>();
  return (
    <div
      style={{ width: "100%" }}
      onMouseEnter={() =>
        onHover({
          rect: ref.current.getBoundingClientRect(),
          imagePath,
        })
      }
      onMouseLeave={() => onHoverOut()}
      ref={ref}
    >
      <Link to={`/${type}/${id}`}>
        <Row>
          <Col span={24}>
            <MvImage srcPath={imagePath} size="w185"></MvImage>
          </Col>
        </Row>
      </Link>
    </div>
  );
};

export default TrendingItem;
