import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  LoadingViewComponent,
  MultiVideoPlayerComponent,
} from "src/components";
import {
  CastComponent,
  PosterComponent,
} from "src/components/DetailsComponent";
import {
  fetchCastandCrewForMovieFromId,
  fetchMoviesDetailsFromId,
} from "src/redux/ducks/movieDetails.slice";
import { AppDispatch, TRootState } from "src/redux/store";
import utils from "src/utils/utils";

const MovieDetailsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { movieDetails, cast, crew } = useSelector(
    (store: TRootState) => store.movieDetailsReducer
  );

  const {
    poster_path,
    title,
    tagline,
    genres,
    overview,
    release_date,
    runtime,
    vote_average,
    imdb_id,
    homepage,
  } = movieDetails;

  const director = utils.getDirectorFromCrew(crew);
  const producers = utils.getProducersFromCew(crew);

  useEffect(() => {
    dispatch(fetchMoviesDetailsFromId({ id: id as string }));
    dispatch(fetchCastandCrewForMovieFromId({ id: id as string }));
  }, [id, dispatch]);
  return (
    <Row className="mt-10">
      <Col span={24}>
        {movieDetails.isLoading ? (
          <LoadingViewComponent />
        ) : (
          <>
            <PosterComponent
              type="movie"
              imgPath={poster_path}
              title={title}
              tagLine={tagline}
              genres={genres}
              overview={overview}
              releaseDate={release_date}
              runTime={runtime}
              rating={vote_average}
              imdbId={imdb_id}
              homepage={homepage}
              director={director}
              producers={producers}
            />
            <div className="mb-4"></div>
            <Col span={24} className="pa-4">
              <MultiVideoPlayerComponent videos={movieDetails.videos.results} />
            </Col>
            <div className="mb-4"></div>
            <Col span={24} className="pa-4">
              <CastComponent cast={cast.results} />
            </Col>
          </>
        )}
      </Col>
    </Row>
  );
};

export default MovieDetailsView;
