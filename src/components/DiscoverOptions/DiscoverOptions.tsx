import { Col, Form, Row, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { applyFilters } from "src/redux/ducks/discover.slice";
import { AppDispatch } from "src/redux/store";
import Filters from "./Filters";
import { SortFilter } from "./SortFilter";

const { Title } = Typography;

const DiscoverOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = (newlyAppliedFilter: any) => {
    let filters: any = {};
    for (let key of Array.from(searchParams.keys())) {
      filters[key] = searchParams.get(key);
    }
    filters = {
      ...filters,
      ...newlyAppliedFilter,
    };
    setSearchParams(filters);
  };
  return (
    <Row>
      <Col span={24}>
        <Form onValuesChange={(val) => updateParams(val)}>
          <SortFilter />
          <Filters />
        </Form>
      </Col>
    </Row>
  );
};

export default DiscoverOptions;
