import { Col, Form, Row, Typography, Radio } from "antd";
import { useSelector } from "react-redux";
import { TRootState } from "src/redux/store";
const { Title } = Typography;

const Filters = () => {
  const { movieGenres } = useSelector(
    (store: TRootState) => store.contentReducer
  );
  return (
    <Row className="theme-secondary-background pa-2 br-3">
      <Col span={24}>
        <Title level={5}>Sort</Title>
      </Col>
      <Col span={24}>
        <Form.Item name="with_genres" rules={[{ required: true }]}>
          <Radio.Group>
            {movieGenres.map((genre) => (
              <Radio value={genre.id}> {genre.name} </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Filters;
