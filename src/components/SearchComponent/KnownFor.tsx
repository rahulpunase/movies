import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { MvImage } from "../MvImage/MvImage";

const { Text } = Typography;

const KnownFor = ({ mediaType, id, name, imagePath }: any) => (
  <Link to={`/${mediaType}/${id}`}>
    <Row>
      <Col span={24}>
        <MvImage size="w92" srcPath={imagePath} />
      </Col>
      <Col span={24} className="mt-1">
        <Text>{name}</Text>
      </Col>
    </Row>
  </Link>
);

export default KnownFor;
