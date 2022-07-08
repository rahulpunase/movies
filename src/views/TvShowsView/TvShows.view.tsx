import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BigContentSwiperSliderComponent,
  TrendingComponent,
} from "src/components";
import {
  fetchGenreForTV,
  fetchTrendingTVs,
} from "src/redux/ducks/content.slice";
import { AppDispatch, TRootState } from "src/redux/store";

const TvShowsView = () => {
  const { trendingTVs, tvGenres } = useSelector(
    (store: TRootState) => store.contentReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!(trendingTVs && trendingTVs.results.length)) {
      dispatch(fetchTrendingTVs());
    }
    if (!tvGenres.length) {
      dispatch(fetchGenreForTV());
    }
  }, [dispatch]);
  return (
    <Row className="mt-4">
      <Col span={24} className="pl-4">
        <BigContentSwiperSliderComponent.RenderTVShows />
      </Col>
      <Col span={24} className="pl-4 mt-7">
        {trendingTVs && trendingTVs.results.length ? (
          <TrendingComponent data={trendingTVs.results} />
        ) : null}
      </Col>
    </Row>
  );
};

export default TvShowsView;
