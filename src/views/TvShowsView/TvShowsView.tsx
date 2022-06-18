import { Col, Row } from "antd";
import { BigContentSwiperSliderComponent } from "src/components";

export const TvShowsView = () => {
  return (
    <Row className="pa-4">
      <Col span={24}>
        <BigContentSwiperSliderComponent.RenderTVShows />
      </Col>
    </Row>
  );
};
