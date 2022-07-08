import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MvImage } from "src/components/MvImage/MvImage";
import { Icon } from "src/lib";
import { removeItemFromFavorite } from "src/redux/ducks/profile.slice";
import { AppDispatch } from "src/redux/store";

const { Title } = Typography;

const FavoriteItem = ({ name, posterPath, id }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);
  const removeFromFavorite = (id: number) => {
    setIsDeleting(true);
    dispatch(
      removeItemFromFavorite({
        media_id: id,
      })
    ).then((_) => setIsDeleting(false));
  };

  const defaultStyling = {
    opacity: 1,
    filter: "blur(0px)",
  };

  return (
    <Row
      className="w-100"
      style={
        isDeleting
          ? {
              opacity: 0.5,
              filter: "blur(2px)",
            }
          : defaultStyling
      }
    >
      <Col span={24}>
        <Row>
          <Col span={5}>
            <MvImage srcPath={posterPath} size="w92" />
          </Col>
          <Col span={19}>
            <Row className="ml-2">
              <Col span={24}>
                <Title level={5}>{name}</Title>
              </Col>
              <Col span={24}>
                <Icon
                  className="custom-cursor-pointer"
                  icon={faTrash}
                  onClick={() => (!isDeleting ? removeFromFavorite(id) : null)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FavoriteItem;
