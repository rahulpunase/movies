import { Col, Row } from "antd";
import React from "react";
import { SearchComponent } from "src/components";
import { FilterComponent } from "src/components";

const RightSideBarComponent = () => {
  return (
    <Row>
      <Col span={24} className="mt-8 pa-4 pb-2">
        <SearchComponent activeClickNavigate />
      </Col>
      <Col span={24} className="pa-4">
        <FilterComponent />
      </Col>
    </Row>
  );
};

export default RightSideBarComponent;
