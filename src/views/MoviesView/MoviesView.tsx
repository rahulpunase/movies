import { Col, Row } from "antd";
import { BigContentSwiperSliderComponent } from "src/components";

export const MoviesView = () => {
  return (
    <Row className="pa-4">
      <Col span={24}>
        <BigContentSwiperSliderComponent.RenderMovies />
      </Col>
    </Row>
  );
};
