import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BigContentSwiperSliderComponent,
  PopularComponent,
  RenderSmoothly,
  TrendingComponent,
  UpComingComponent,
} from "src/components";
import {
  fetchGenreForMovie,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpComing,
} from "src/redux/ducks/content.slice";
import { AppDispatch, TRootState } from "src/redux/store";

const MoviesView = () => {
  const { trendingMovies, movieGenres, upcomingMovies, popularMovies } =
    useSelector((store: TRootState) => store.contentReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!popularMovies.results.length) {
      dispatch(fetchPopularMovies());
    }
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
    <RenderSmoothly>
      <Row>
        <Col span={24}>
          {popularMovies.results.length && (
            <PopularComponent
              data={popularMovies.results.map((item) => ({
                name: item.original_title,
                overview: item.overview,
                id: item.id,
                poster_path: item.poster_path,
                media_type: "movie",
              }))}
            />
          )}
        </Col>
        <Col span={24} className="pl-4 mt-10">
          {trendingMovies && trendingMovies.results.length ? (
            <TrendingComponent data={trendingMovies.results} />
          ) : null}
        </Col>
        {upcomingMovies.results.length && (
          <Col span={24}>
            <UpComingComponent data={upcomingMovies.results} />
          </Col>
        )}
      </Row>
    </RenderSmoothly>
  );
};

export default MoviesView;
