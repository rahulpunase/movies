import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BigContentSwiperSliderComponent,
  PopularComponent,
  RenderSmoothly,
  TrendingComponent,
} from "src/components";
import {
  fetchGenreForTV,
  fetchPopularTVShows,
  fetchTrendingTVs,
} from "src/redux/ducks/content.slice";
import { AppDispatch, TRootState } from "src/redux/store";

const TvShowsView = () => {
  const { trendingTVs, tvGenres, popularTvShows } = useSelector(
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
    if (!popularTvShows.results.length) {
      dispatch(fetchPopularTVShows());
    }
  }, [dispatch]);
  return (
    <RenderSmoothly>
      <Row>
        <Col span={24}>
          {popularTvShows.results.length && (
            <PopularComponent
              data={popularTvShows.results.map((item) => ({
                name: item.name,
                overview: item.overview,
                id: item.id,
                poster_path: item.poster_path,
                media_type: "tv",
              }))}
            />
          )}
        </Col>
        <Col span={24} className="pl-4 mt-7">
          {trendingTVs && trendingTVs.results.length ? (
            <TrendingComponent data={trendingTVs.results} />
          ) : null}
        </Col>
      </Row>
    </RenderSmoothly>
  );
};

export default TvShowsView;
