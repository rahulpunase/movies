import { Card, Col, List, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  URLSearchParamsInit,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ItemAuthDropDownComponent, RenderSmoothly } from "src/components";
import { MvImage } from "src/components/MvImage/MvImage";
import { fetchDiscoveredItems } from "src/redux/ducks/discover.slice";
import { AppDispatch, TRootState } from "src/redux/store";

const { Text } = Typography;

const DiscoverView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let { type } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { results, isLoading, appliedFilters } = useSelector(
    (store: TRootState) => store.discoverReducer
  );

  useEffect(() => {
    const filters: any = {};
    for (let key of Array.from(searchParams.keys())) {
      filters[key] = searchParams.get(key);
    }
    dispatch(
      fetchDiscoveredItems({
        filters,
        type: type,
      })
    );
  }, [searchParams]);

  return (
    <Row className="pa-4 mt-10">
      <Col span={24}>
        <List
          grid={{ xs: 2, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          dataSource={results}
          loading={isLoading}
          renderItem={(item) => (
            <RenderSmoothly>
              <List.Item>
                <ItemAuthDropDownComponent item={item} type={type} />
                <Link to={`/${type}/${item.id}/`}>
                  <Card
                    cover={<MvImage srcPath={item.poster_path} size="w300" />}
                  >
                    <Meta
                      title={<Text>{item.original_title || item.name}</Text>}
                      description="www.instagram.com"
                    />
                  </Card>
                </Link>
              </List.Item>
            </RenderSmoothly>
          )}
        />
      </Col>
    </Row>
  );
};

export default DiscoverView;
