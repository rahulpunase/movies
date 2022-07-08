import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BigContentSwiperSliderComponent,
  TrendingComponent,
  UpComingComponent,
} from "src/components";
import {
  fetchGenreForMovie,
  fetchTrendingMovies,
  fetchUpComing,
} from "src/redux/ducks/content.slice";
import { AppDispatch, TRootState } from "src/redux/store";

const MoviesView = () => {
  const { trendingMovies, movieGenres, upcomingMovies } = useSelector(
    (store: TRootState) => store.contentReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!(trendingMovies && trendingMovies.results.length)) {
      dispatch(fetchTrendingMovies());
    }
    if (!movieGenres.length) {
      dispatch(fetchGenreForMovie());
    }
    if (!upcomingMovies.results.length) {
      dispatch(fetchUpComing());
    }
  }, [dispatch]);
  return (
    <Row className="mt-4">
      <Col span={24} className="pl-4">
        <BigContentSwiperSliderComponent.RenderMovies />
      </Col>
      <Col span={24} className="pl-4 mt-7">
        {trendingMovies && trendingMovies.results.length ? (
          <TrendingComponent data={trendingMovies.results} />
        ) : null}
      </Col>
      <Col span={24}>
        <UpComingComponent data={upcomingMovies.results} />
      </Col>
    </Row>
  );
};

export default MoviesView;
