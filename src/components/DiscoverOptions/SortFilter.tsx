import { Col, Form, Row, Select, Typography } from "antd";
import sortValue from "./sort.json";

const { Title } = Typography;

const { Option } = Select;

export const SortFilter = ({ onSortDataChange }: any) => {
  return (
    <Row className="theme-secondary-background pa-2 br-3">
      <Col span={24}>
        <Title level={5}>Sort</Title>
      </Col>
      <Col span={24}>
        <Form.Item name="sort_by" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={() => {}}
            allowClear
          >
            {sortValue.map((option) => (
              <Option value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};
