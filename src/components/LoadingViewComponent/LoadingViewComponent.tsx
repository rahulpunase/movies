import { Col, Row, Skeleton } from "antd";

const LoadingViewComponent = () => (
  <Row>
    <Col span={9} className="d-flex justify-center align-center">
      <Skeleton.Image
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Col>
    <Col span={15}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Col>
  </Row>
);

export default LoadingViewComponent;
